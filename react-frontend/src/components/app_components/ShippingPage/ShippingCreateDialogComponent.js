import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";


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
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const ShippingCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [shippingRecipientsName, setShippingRecipientsName] = useState([])
const [shippingRecipientsAddressCountryName, setShippingRecipientsAddressCountryName] = useState([])
const [shippingRecipientsAddressStateName, setShippingRecipientsAddressStateName] = useState([])
const [shippingRecipientsIdentifierType, setShippingRecipientsIdentifierType] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [shippingRecipientsName,shippingRecipientsAddressCountryName,shippingRecipientsAddressStateName,shippingRecipientsIdentifierType], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            shippingRecipientsName: _entity?.shippingRecipientsName?._id,shippingRecipientsAddressCountryName: _entity?.shippingRecipientsAddressCountryName?._id,shippingRecipientsAddressStateName: _entity?.shippingRecipientsAddressStateName?._id,shippingRecipientsAddressCityName: _entity?.shippingRecipientsAddressCityName,shippingRecipientsAddressPostalZone: _entity?.shippingRecipientsAddressPostalZone,shippingRecipientsTin: _entity?.shippingRecipientsTin,shippingRecipientsIdentifierType: _entity?.shippingRecipientsIdentifierType?._id,businessRegistrationNumberIdentificationNumberPassportNumber: _entity?.businessRegistrationNumberIdentificationNumberPassportNumber,billReferenceNumber: _entity?.billReferenceNumber,referenceNumberOfCustomsFormNo19Etc: _entity?.referenceNumberOfCustomsFormNo19Etc,incoterms: _entity?.incoterms,freeTradeAgreementFtaInformation: _entity?.freeTradeAgreementFtaInformation,authorisationNumberForCertifiedExporter: _entity?.authorisationNumberForCertifiedExporter,referenceNumberOfCustomsFormNo2: _entity?.referenceNumberOfCustomsFormNo2,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("shipping").create(_data);
        const eagerResult = await client
            .service("shipping")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "shippingRecipientsName",
                    service : "companies",
                    select:["name"]},{
                    path : "shippingRecipientsAddressCountryName",
                    service : "countryCodes",
                    select:["countryCode"]},{
                    path : "shippingRecipientsAddressStateName",
                    service : "stateCodes",
                    select:["stateCode"]},{
                    path : "shippingRecipientsIdentifierType",
                    service : "identifyType",
                    select:["identifyType"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Shipping updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Shipping" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount companies
                    client
                        .service("companies")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCompaniesId } })
                        .then((res) => {
                            setShippingRecipientsName(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Companies", type: "error", message: error.message || "Failed get companies" });
                        });
                }, []);

useEffect(() => {
                    // on mount countryCodes
                    client
                        .service("countryCodes")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCountryCodesId } })
                        .then((res) => {
                            setShippingRecipientsAddressCountryName(res.data.map((e) => { return { name: e['countryCode'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "CountryCodes", type: "error", message: error.message || "Failed get countryCodes" });
                        });
                }, []);

useEffect(() => {
                    // on mount stateCodes
                    client
                        .service("stateCodes")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleStateCodesId } })
                        .then((res) => {
                            setShippingRecipientsAddressStateName(res.data.map((e) => { return { name: e['stateCode'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "StateCodes", type: "error", message: error.message || "Failed get stateCodes" });
                        });
                }, []);

useEffect(() => {
                    // on mount identifyType
                    client
                        .service("identifyType")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleIdentifyTypeId } })
                        .then((res) => {
                            setShippingRecipientsIdentifierType(res.data.map((e) => { return { name: e['identifyType'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "IdentifyType", type: "error", message: error.message || "Failed get identifyType" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const shippingRecipientsNameOptions = shippingRecipientsName.map((elem) => ({ name: elem.name, value: elem.value }));
const shippingRecipientsAddressCountryNameOptions = shippingRecipientsAddressCountryName.map((elem) => ({ name: elem.name, value: elem.value }));
const shippingRecipientsAddressStateNameOptions = shippingRecipientsAddressStateName.map((elem) => ({ name: elem.name, value: elem.value }));
const shippingRecipientsIdentifierTypeOptions = shippingRecipientsIdentifierType.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Shipping" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="shipping-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="shippingRecipientsName">Shipping Recipient's Name:</label>
                <Dropdown id="shippingRecipientsName" value={_entity?.shippingRecipientsName?._id} optionLabel="name" optionValue="value" options={shippingRecipientsNameOptions} onChange={(e) => setValByKey("shippingRecipientsName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["shippingRecipientsName"]) ? (
              <p className="m-0" key="error-shippingRecipientsName">
                {error["shippingRecipientsName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="shippingRecipientsAddressCountryName">Shipping Recipient’s Address

(Country name):</label>
                <Dropdown id="shippingRecipientsAddressCountryName" value={_entity?.shippingRecipientsAddressCountryName?._id} optionLabel="name" optionValue="value" options={shippingRecipientsAddressCountryNameOptions} onChange={(e) => setValByKey("shippingRecipientsAddressCountryName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["shippingRecipientsAddressCountryName"]) ? (
              <p className="m-0" key="error-shippingRecipientsAddressCountryName">
                {error["shippingRecipientsAddressCountryName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="shippingRecipientsAddressStateName">Shipping Recipient’s Address

(State name):</label>
                <Dropdown id="shippingRecipientsAddressStateName" value={_entity?.shippingRecipientsAddressStateName?._id} optionLabel="name" optionValue="value" options={shippingRecipientsAddressStateNameOptions} onChange={(e) => setValByKey("shippingRecipientsAddressStateName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["shippingRecipientsAddressStateName"]) ? (
              <p className="m-0" key="error-shippingRecipientsAddressStateName">
                {error["shippingRecipientsAddressStateName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="shippingRecipientsAddressCityName">Shipping Recipient’s Address

(City name):</label>
                <InputText id="shippingRecipientsAddressCityName" className="w-full mb-3 p-inputtext-sm" value={_entity?.shippingRecipientsAddressCityName} onChange={(e) => setValByKey("shippingRecipientsAddressCityName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["shippingRecipientsAddressCityName"]) ? (
              <p className="m-0" key="error-shippingRecipientsAddressCityName">
                {error["shippingRecipientsAddressCityName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="shippingRecipientsAddressPostalZone">Shipping Recipient’s Address

(Postal Zone):</label>
                <InputNumber id="shippingRecipientsAddressPostalZone" className="w-full mb-3 p-inputtext-sm" value={_entity?.shippingRecipientsAddressPostalZone} onChange={(e) => setValByKey("shippingRecipientsAddressPostalZone", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["shippingRecipientsAddressPostalZone"]) ? (
              <p className="m-0" key="error-shippingRecipientsAddressPostalZone">
                {error["shippingRecipientsAddressPostalZone"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="shippingRecipientsTin">Shipping Recipient's TIN:</label>
                <InputText id="shippingRecipientsTin" className="w-full mb-3 p-inputtext-sm" value={_entity?.shippingRecipientsTin} onChange={(e) => setValByKey("shippingRecipientsTin", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["shippingRecipientsTin"]) ? (
              <p className="m-0" key="error-shippingRecipientsTin">
                {error["shippingRecipientsTin"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="shippingRecipientsIdentifierType">Shipping Recipient's Identifier type:</label>
                <Dropdown id="shippingRecipientsIdentifierType" value={_entity?.shippingRecipientsIdentifierType?._id} optionLabel="name" optionValue="value" options={shippingRecipientsIdentifierTypeOptions} onChange={(e) => setValByKey("shippingRecipientsIdentifierType", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["shippingRecipientsIdentifierType"]) ? (
              <p className="m-0" key="error-shippingRecipientsIdentifierType">
                {error["shippingRecipientsIdentifierType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="businessRegistrationNumberIdentificationNumberPassportNumber">Business registration number/ Identification number / Passport number:</label>
                <InputText id="businessRegistrationNumberIdentificationNumberPassportNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.businessRegistrationNumberIdentificationNumberPassportNumber} onChange={(e) => setValByKey("businessRegistrationNumberIdentificationNumberPassportNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["businessRegistrationNumberIdentificationNumberPassportNumber"]) ? (
              <p className="m-0" key="error-businessRegistrationNumberIdentificationNumberPassportNumber">
                {error["businessRegistrationNumberIdentificationNumberPassportNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="billReferenceNumber">Bill  Reference Number:</label>
                <InputText id="billReferenceNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.billReferenceNumber} onChange={(e) => setValByKey("billReferenceNumber", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["billReferenceNumber"]) ? (
              <p className="m-0" key="error-billReferenceNumber">
                {error["billReferenceNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="referenceNumberOfCustomsFormNo19Etc">Reference Number of Customs Form No.1, 9, etc.:</label>
                <InputText id="referenceNumberOfCustomsFormNo19Etc" className="w-full mb-3 p-inputtext-sm" value={_entity?.referenceNumberOfCustomsFormNo19Etc} onChange={(e) => setValByKey("referenceNumberOfCustomsFormNo19Etc", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["referenceNumberOfCustomsFormNo19Etc"]) ? (
              <p className="m-0" key="error-referenceNumberOfCustomsFormNo19Etc">
                {error["referenceNumberOfCustomsFormNo19Etc"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="incoterms">Incoterms:</label>
                <InputText id="incoterms" className="w-full mb-3 p-inputtext-sm" value={_entity?.incoterms} onChange={(e) => setValByKey("incoterms", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["incoterms"]) ? (
              <p className="m-0" key="error-incoterms">
                {error["incoterms"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="freeTradeAgreementFtaInformation">Free Trade Agreement (FTA) Information:</label>
                <InputTextarea id="freeTradeAgreementFtaInformation" rows={5} cols={30} value={_entity?.freeTradeAgreementFtaInformation} onChange={ (e) => setValByKey("freeTradeAgreementFtaInformation", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["freeTradeAgreementFtaInformation"]) ? (
              <p className="m-0" key="error-freeTradeAgreementFtaInformation">
                {error["freeTradeAgreementFtaInformation"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="authorisationNumberForCertifiedExporter">Authorisation Number for Certified Exporter:</label>
                <InputText id="authorisationNumberForCertifiedExporter" className="w-full mb-3 p-inputtext-sm" value={_entity?.authorisationNumberForCertifiedExporter} onChange={(e) => setValByKey("authorisationNumberForCertifiedExporter", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["authorisationNumberForCertifiedExporter"]) ? (
              <p className="m-0" key="error-authorisationNumberForCertifiedExporter">
                {error["authorisationNumberForCertifiedExporter"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="referenceNumberOfCustomsFormNo2">Reference Number of Customs Form No.2:</label>
                <InputText id="referenceNumberOfCustomsFormNo2" className="w-full mb-3 p-inputtext-sm" value={_entity?.referenceNumberOfCustomsFormNo2} onChange={(e) => setValByKey("referenceNumberOfCustomsFormNo2", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["referenceNumberOfCustomsFormNo2"]) ? (
              <p className="m-0" key="error-referenceNumberOfCustomsFormNo2">
                {error["referenceNumberOfCustomsFormNo2"]}
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

export default connect(mapState, mapDispatch)(ShippingCreateDialogComponent);
