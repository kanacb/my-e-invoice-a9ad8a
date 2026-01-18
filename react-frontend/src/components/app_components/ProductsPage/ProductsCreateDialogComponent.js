import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = {};
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg[key] = element.message;
      }
    }
  }
  return errMsg.length
    ? errMsg
    : errorObj.message
      ? { error: errorObj.message }
      : {};
};

const ProductsCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [measurement, setMeasurement] = useState([]);

  useEffect(() => {
    let init = {};
    if (!_.isEmpty(props?.entity)) {
      init = initilization(
        { ...props?.entity, ...init },
        [measurement],
        setError,
      );
    }
    set_entity({ ...init });
    setError({});
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;
    let _data = {
      productName: _entity?.productName,
      quantity: _entity?.quantity,
      unitPrice: _entity?.unitPrice,
      measurement: _entity?.measurement?._id,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("products").create(_data);
      const eagerResult = await client.service("products").find({
        query: {
          $limit: 10000,
          _id: { $in: [result._id] },
          $populate: [
            {
              path: "measurement",
              service: "measurements",
              select: ["measurement"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info Products updated successfully",
      });
      props.onCreateResult(eagerResult.data[0]);
    } catch (error) {
      console.log("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in Products",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    // on mount measurements
    client
      .service("measurements")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleMeasurementsId,
        },
      })
      .then((res) => {
        setMeasurement(
          res.data.map((e) => {
            return { name: e["measurement"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Measurements",
          type: "error",
          message: error.message || "Failed get measurements",
        });
      });
  }, []);

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="close"
        className="p-button-text no-focus-effect p-button-secondary"
        onClick={props.onHide}
      />
    </div>
  );

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError({});
  };

  const measurementOptions = measurement.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

  return (
    <Dialog
      header="Create Products"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "40vw" }}
      className="min-w-max scalein animation-ease-in-out animation-duration-1000"
      footer={renderFooter()}
      resizable={false}
    >
      <div
        className="grid p-fluid overflow-y-auto"
        style={{ maxWidth: "55vw" }}
        role="products-create-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="productName">Product name:</label>
            <InputText
              id="productName"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.productName}
              onChange={(e) => setValByKey("productName", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["productName"]) ? (
              <p className="m-0" key="error-productName">
                {error["productName"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="quantity">Quantity:</label>
            <InputNumber
              id="quantity"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.quantity}
              onChange={(e) => setValByKey("quantity", e.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["quantity"]) ? (
              <p className="m-0" key="error-quantity">
                {error["quantity"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="unitPrice">Unit Price:</label>
            <InputNumber
              id="unitPrice"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.unitPrice}
              onChange={(e) => setValByKey("unitPrice", e.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["unitPrice"]) ? (
              <p className="m-0" key="error-unitPrice">
                {error["unitPrice"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="measurement">Measurement:</label>
            <Dropdown
              id="measurement"
              value={_entity?.measurement?._id}
              optionLabel="name"
              optionValue="value"
              options={measurementOptions}
              onChange={(e) => setValByKey("measurement", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["measurement"]) ? (
              <p className="m-0" key="error-measurement">
                {error["measurement"]}
              </p>
            ) : null}
          </small>
        </div>
        <small className="p-error">
          {Array.isArray(Object.keys(error))
            ? Object.keys(error).map((e, i) => (
                <p className="m-0" key={i}>
                  {e}: {error[e]}
                </p>
              ))
            : error}
        </small>
      </div>
    </Dialog>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ProductsCreateDialogComponent);
