import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import moment from "moment";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = {};
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg.push(element.message);
      }
    }
  }
  return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ProductsCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [measurement, setMeasurement] = useState([]);

  useEffect(() => {
    set_entity(props.entity);
  }, [props.entity, props.show]);

  useEffect(() => {
    //on mount measurements
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

  const onSave = async () => {
    let _data = {
      productName: _entity?.productName,
      quantity: _entity?.quantity,
      unitPrice: _entity?.unitPrice,
      measurement: _entity?.measurement?._id,
    };

    setLoading(true);
    try {
      await client.service("products").patch(_entity._id, _data);
      const eagerResult = await client.service("products").find({
        query: {
          $limit: 10000,
          _id: { $in: [_entity._id] },
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
        title: "Edit info",
        message: "Info products updated successfully",
      });
      props.onEditResult(eagerResult.data[0]);
    } catch (error) {
      console.log("error", error);
      setError(
        getSchemaValidationErrorsStrings(error) || "Failed to update info",
      );
      props.alert({
        type: "error",
        title: "Edit info",
        message: "Failed to update info",
      });
    }
    setLoading(false);
  };

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
      header="Edit Products"
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
        role="products-edit-dialog-component"
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
            {!_.isEmpty(error["productName"]) && (
              <p className="m-0" key="error-productName">
                {error["productName"]}
              </p>
            )}
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
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["quantity"]) && (
              <p className="m-0" key="error-quantity">
                {error["quantity"]}
              </p>
            )}
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
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["unitPrice"]) && (
              <p className="m-0" key="error-unitPrice">
                {error["unitPrice"]}
              </p>
            )}
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
            {!_.isEmpty(error["measurement"]) && (
              <p className="m-0" key="error-measurement">
                {error["measurement"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12">&nbsp;</div>
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
