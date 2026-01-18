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
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

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

const BuyersCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [buyersName, setBuyersName] = useState([]);
  const [identifierType, setIdentifierType] = useState([]);
  const [buyersAddressCountryName, setBuyersAddressCountryName] = useState([]);
  const [buyersAddressStateName, setBuyersAddressStateName] = useState([]);
  const [theFirstBuyersContactNumber, setTheFirstBuyersContactNumber] =
    useState([]);
  const [invoiceCurrency, setInvoiceCurrency] = useState([]);
  const [frequencyOfBilling, setFrequencyOfBilling] = useState([]);
  const [paymentMode, setPaymentMode] = useState([]);

  useEffect(() => {
    set_entity(props.entity);
  }, [props.entity, props.show]);

  useEffect(() => {
    //on mount companies
    client
      .service("companies")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleCompaniesId,
        },
      })
      .then((res) => {
        setBuyersName(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Companies",
          type: "error",
          message: error.message || "Failed get companies",
        });
      });
  }, []);
  useEffect(() => {
    //on mount identifyType
    client
      .service("identifyType")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleIdentifyTypeId,
        },
      })
      .then((res) => {
        setIdentifierType(
          res.data.map((e) => {
            return { name: e["identifyType"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "IdentifyType",
          type: "error",
          message: error.message || "Failed get identifyType",
        });
      });
  }, []);
  useEffect(() => {
    //on mount countryCodes
    client
      .service("countryCodes")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleCountryCodesId,
        },
      })
      .then((res) => {
        setBuyersAddressCountryName(
          res.data.map((e) => {
            return { name: e["countryCode"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "CountryCodes",
          type: "error",
          message: error.message || "Failed get countryCodes",
        });
      });
  }, []);
  useEffect(() => {
    //on mount stateCodes
    client
      .service("stateCodes")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleStateCodesId,
        },
      })
      .then((res) => {
        setBuyersAddressStateName(
          res.data.map((e) => {
            return { name: e["stateCode"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "StateCodes",
          type: "error",
          message: error.message || "Failed get stateCodes",
        });
      });
  }, []);
  useEffect(() => {
    //on mount phoneNumberPrefix
    client
      .service("phoneNumberPrefix")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singlePhoneNumberPrefixId,
        },
      })
      .then((res) => {
        setTheFirstBuyersContactNumber(
          res.data.map((e) => {
            return { name: e["phoneNumberPrefix"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "PhoneNumberPrefix",
          type: "error",
          message: error.message || "Failed get phoneNumberPrefix",
        });
      });
  }, []);
  useEffect(() => {
    //on mount currencyCodes
    client
      .service("currencyCodes")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleCurrencyCodesId,
        },
      })
      .then((res) => {
        setInvoiceCurrency(
          res.data.map((e) => {
            return { name: e["currencyCode"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "CurrencyCodes",
          type: "error",
          message: error.message || "Failed get currencyCodes",
        });
      });
  }, []);
  useEffect(() => {
    //on mount frequencyOfBilling
    client
      .service("frequencyOfBilling")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleFrequencyOfBillingId,
        },
      })
      .then((res) => {
        setFrequencyOfBilling(
          res.data.map((e) => {
            return { name: e["frequencyOfBilling"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "FrequencyOfBilling",
          type: "error",
          message: error.message || "Failed get frequencyOfBilling",
        });
      });
  }, []);
  useEffect(() => {
    //on mount paymentModes
    client
      .service("paymentModes")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singlePaymentModesId,
        },
      })
      .then((res) => {
        setPaymentMode(
          res.data.map((e) => {
            return { name: e["paymentMode"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "PaymentModes",
          type: "error",
          message: error.message || "Failed get paymentModes",
        });
      });
  }, []);

  const onSave = async () => {
    let _data = {
      buyersName: _entity?.buyersName?._id,
      buyersTin: _entity?.buyersTin,
      buyersSstRegistrationNumber: _entity?.buyersSstRegistrationNumber,
      identifierType: _entity?.identifierType?._id,
      businessRegistrationNumberIdentificationNumberPassportNumber:
        _entity?.businessRegistrationNumberIdentificationNumberPassportNumber,
      buyersEMail: _entity?.buyersEMail,
      buyersAddressCountryName: _entity?.buyersAddressCountryName?._id,
      buyersAddressStateName: _entity?.buyersAddressStateName?._id,
      buyersAddressCityName: _entity?.buyersAddressCityName,
      buyersAddressPostalZone: _entity?.buyersAddressPostalZone,
      theFirstBuyersContactNumber: _entity?.theFirstBuyersContactNumber?._id,
      buyersContactNumber: _entity?.buyersContactNumber,
      invoiceCurrency: _entity?.invoiceCurrency?._id,
      currencyExchangeRate: _entity?.currencyExchangeRate,
      frequencyOfBilling: _entity?.frequencyOfBilling?._id,
      billingPeriodStartDate: _entity?.billingPeriodStartDate,
      billingPeriodEndDate: _entity?.billingPeriodEndDate,
      paymentMode: _entity?.paymentMode?._id,
    };

    setLoading(true);
    try {
      await client.service("buyers").patch(_entity._id, _data);
      const eagerResult = await client.service("buyers").find({
        query: {
          $limit: 10000,
          _id: { $in: [_entity._id] },
          $populate: [
            {
              path: "buyersName",
              service: "companies",
              select: ["name"],
            },
            {
              path: "identifierType",
              service: "identifyType",
              select: ["identifyType"],
            },
            {
              path: "buyersAddressCountryName",
              service: "countryCodes",
              select: ["countryCode"],
            },
            {
              path: "buyersAddressStateName",
              service: "stateCodes",
              select: ["stateCode"],
            },
            {
              path: "theFirstBuyersContactNumber",
              service: "phoneNumberPrefix",
              select: ["phoneNumberPrefix"],
            },
            {
              path: "invoiceCurrency",
              service: "currencyCodes",
              select: ["currencyCode"],
            },
            {
              path: "frequencyOfBilling",
              service: "frequencyOfBilling",
              select: ["frequencyOfBilling"],
            },
            {
              path: "paymentMode",
              service: "paymentModes",
              select: ["paymentMode"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Edit info",
        message: "Info buyers updated successfully",
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

  const buyersNameOptions = buyersName.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const identifierTypeOptions = identifierType.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const buyersAddressCountryNameOptions = buyersAddressCountryName.map(
    (elem) => ({ name: elem.name, value: elem.value }),
  );
  const buyersAddressStateNameOptions = buyersAddressStateName.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const theFirstBuyersContactNumberOptions = theFirstBuyersContactNumber.map(
    (elem) => ({ name: elem.name, value: elem.value }),
  );
  const invoiceCurrencyOptions = invoiceCurrency.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const frequencyOfBillingOptions = frequencyOfBilling.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const paymentModeOptions = paymentMode.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

  return (
    <Dialog
      header="Edit Buyers"
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
        role="buyers-edit-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="buyersName">Buyer's name (*):</label>
            <Dropdown
              id="buyersName"
              value={_entity?.buyersName?._id}
              optionLabel="name"
              optionValue="value"
              options={buyersNameOptions}
              onChange={(e) => setValByKey("buyersName", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["buyersName"]) && (
              <p className="m-0" key="error-buyersName">
                {error["buyersName"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="buyersTin">Buyer's TIN:</label>
            <InputText
              id="buyersTin"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.buyersTin}
              onChange={(e) => setValByKey("buyersTin", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["buyersTin"]) && (
              <p className="m-0" key="error-buyersTin">
                {error["buyersTin"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="buyersSstRegistrationNumber">
              Buyer's SST Registration Number:
            </label>
            <InputText
              id="buyersSstRegistrationNumber"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.buyersSstRegistrationNumber}
              onChange={(e) =>
                setValByKey("buyersSstRegistrationNumber", e.target.value)
              }
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["buyersSstRegistrationNumber"]) && (
              <p className="m-0" key="error-buyersSstRegistrationNumber">
                {error["buyersSstRegistrationNumber"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="identifierType">Identifier Type:</label>
            <Dropdown
              id="identifierType"
              value={_entity?.identifierType?._id}
              optionLabel="name"
              optionValue="value"
              options={identifierTypeOptions}
              onChange={(e) => setValByKey("identifierType", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["identifierType"]) && (
              <p className="m-0" key="error-identifierType">
                {error["identifierType"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="businessRegistrationNumberIdentificationNumberPassportNumber">
              Business registration number / Identification number / Passport
              number:
            </label>
            <InputText
              id="businessRegistrationNumberIdentificationNumberPassportNumber"
              className="w-full mb-3 p-inputtext-sm"
              value={
                _entity?.businessRegistrationNumberIdentificationNumberPassportNumber
              }
              onChange={(e) =>
                setValByKey(
                  "businessRegistrationNumberIdentificationNumberPassportNumber",
                  e.target.value,
                )
              }
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(
              error[
                "businessRegistrationNumberIdentificationNumberPassportNumber"
              ],
            ) && (
              <p
                className="m-0"
                key="error-businessRegistrationNumberIdentificationNumberPassportNumber"
              >
                {
                  error[
                    "businessRegistrationNumberIdentificationNumberPassportNumber"
                  ]
                }
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="buyersEMail">Buyer's e-mail:</label>
            <InputText
              id="buyersEMail"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.buyersEMail}
              onChange={(e) => setValByKey("buyersEMail", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["buyersEMail"]) && (
              <p className="m-0" key="error-buyersEMail">
                {error["buyersEMail"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="buyersAddressCountryName">
              Buyer's address (Country name):
            </label>
            <Dropdown
              id="buyersAddressCountryName"
              value={_entity?.buyersAddressCountryName?._id}
              optionLabel="name"
              optionValue="value"
              options={buyersAddressCountryNameOptions}
              onChange={(e) =>
                setValByKey("buyersAddressCountryName", { _id: e.value })
              }
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["buyersAddressCountryName"]) && (
              <p className="m-0" key="error-buyersAddressCountryName">
                {error["buyersAddressCountryName"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="buyersAddressStateName">
              Buyer's address (State name):
            </label>
            <Dropdown
              id="buyersAddressStateName"
              value={_entity?.buyersAddressStateName?._id}
              optionLabel="name"
              optionValue="value"
              options={buyersAddressStateNameOptions}
              onChange={(e) =>
                setValByKey("buyersAddressStateName", { _id: e.value })
              }
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["buyersAddressStateName"]) && (
              <p className="m-0" key="error-buyersAddressStateName">
                {error["buyersAddressStateName"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="buyersAddressCityName">
              Buyer's address (City name):
            </label>
            <InputText
              id="buyersAddressCityName"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.buyersAddressCityName}
              onChange={(e) =>
                setValByKey("buyersAddressCityName", e.target.value)
              }
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["buyersAddressCityName"]) && (
              <p className="m-0" key="error-buyersAddressCityName">
                {error["buyersAddressCityName"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="buyersAddressPostalZone">
              Buyer's address (Postal zone):
            </label>
            <InputNumber
              id="buyersAddressPostalZone"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.buyersAddressPostalZone}
              onChange={(e) => setValByKey("buyersAddressPostalZone", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["buyersAddressPostalZone"]) && (
              <p className="m-0" key="error-buyersAddressPostalZone">
                {error["buyersAddressPostalZone"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="theFirstBuyersContactNumber">
              The first buyer's contact number:
            </label>
            <Dropdown
              id="theFirstBuyersContactNumber"
              value={_entity?.theFirstBuyersContactNumber?._id}
              optionLabel="name"
              optionValue="value"
              options={theFirstBuyersContactNumberOptions}
              onChange={(e) =>
                setValByKey("theFirstBuyersContactNumber", { _id: e.value })
              }
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["theFirstBuyersContactNumber"]) && (
              <p className="m-0" key="error-theFirstBuyersContactNumber">
                {error["theFirstBuyersContactNumber"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="buyersContactNumber">Buyer's Contact Number:</label>
            <InputNumber
              id="buyersContactNumber"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.buyersContactNumber}
              onChange={(e) => setValByKey("buyersContactNumber", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["buyersContactNumber"]) && (
              <p className="m-0" key="error-buyersContactNumber">
                {error["buyersContactNumber"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="invoiceCurrency">Invoice Currency:</label>
            <Dropdown
              id="invoiceCurrency"
              value={_entity?.invoiceCurrency?._id}
              optionLabel="name"
              optionValue="value"
              options={invoiceCurrencyOptions}
              onChange={(e) => setValByKey("invoiceCurrency", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["invoiceCurrency"]) && (
              <p className="m-0" key="error-invoiceCurrency">
                {error["invoiceCurrency"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="currencyExchangeRate">
              Currency Exchange Rate:
            </label>
            <InputNumber
              id="currencyExchangeRate"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.currencyExchangeRate}
              onChange={(e) => setValByKey("currencyExchangeRate", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["currencyExchangeRate"]) && (
              <p className="m-0" key="error-currencyExchangeRate">
                {error["currencyExchangeRate"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="frequencyOfBilling">Frequency of Billing:</label>
            <Dropdown
              id="frequencyOfBilling"
              value={_entity?.frequencyOfBilling?._id}
              optionLabel="name"
              optionValue="value"
              options={frequencyOfBillingOptions}
              onChange={(e) =>
                setValByKey("frequencyOfBilling", { _id: e.value })
              }
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["frequencyOfBilling"]) && (
              <p className="m-0" key="error-frequencyOfBilling">
                {error["frequencyOfBilling"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="billingPeriodStartDate">
              Billing Period Start Date:
            </label>
            undefined
          </span>
          <small className="p-error">
            {!_.isEmpty(error["billingPeriodStartDate"]) && (
              <p className="m-0" key="error-billingPeriodStartDate">
                {error["billingPeriodStartDate"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="billingPeriodEndDate">
              Billing Period End Date:
            </label>
            undefined
          </span>
          <small className="p-error">
            {!_.isEmpty(error["billingPeriodEndDate"]) && (
              <p className="m-0" key="error-billingPeriodEndDate">
                {error["billingPeriodEndDate"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="paymentMode">Payment Mode:</label>
            <Dropdown
              id="paymentMode"
              value={_entity?.paymentMode?._id}
              optionLabel="name"
              optionValue="value"
              options={paymentModeOptions}
              onChange={(e) => setValByKey("paymentMode", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["paymentMode"]) && (
              <p className="m-0" key="error-paymentMode">
                {error["paymentMode"]}
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

export default connect(mapState, mapDispatch)(BuyersCreateDialogComponent);
