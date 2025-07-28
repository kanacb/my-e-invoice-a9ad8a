import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import buyersFakerFactory from "./buyersFakerFactory";

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
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

const BuyersFakerDialogComponent = (props) => {
    const [fakerCount, setFakerCount] = useState(1);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [buyersNameIds, setbuyersNameIds] = useState();
const [identifierTypeIds, setidentifierTypeIds] = useState();
const [buyersAddressCountryNameIds, setbuyersAddressCountryNameIds] = useState();
const [buyersAddressStateNameIds, setbuyersAddressStateNameIds] = useState();
const [theFirstBuyersContactNumberIds, settheFirstBuyersContactNumberIds] = useState();
const [invoiceCurrencyIds, setinvoiceCurrencyIds] = useState();
const [frequencyOfBillingIds, setfrequencyOfBillingIds] = useState();
const [paymentModeIds, setpaymentModeIds] = useState();
const [teamIds, setteamIds] = useState();
const [invoiceIdIds, setinvoiceIdIds] = useState();


    useEffect(() => {
        setFakerCount(1);
       
        client.service("companies")
                        .find({ query: { $select: ["_id","name"] } })
                        .then((data) => {
                        setbuyersNameIds(data.data);
                        });
client.service("identifyType")
                        .find({ query: { $select: ["_id","identifyType"] } })
                        .then((data) => {
                        setidentifierTypeIds(data.data);
                        });
client.service("countryCodes")
                        .find({ query: { $select: ["_id","countryCode"] } })
                        .then((data) => {
                        setbuyersAddressCountryNameIds(data.data);
                        });
client.service("stateCodes")
                        .find({ query: { $select: ["_id","stateCode"] } })
                        .then((data) => {
                        setbuyersAddressStateNameIds(data.data);
                        });
client.service("phoneNumberPrefix")
                        .find({ query: { $select: ["_id","phoneNumberPrefix"] } })
                        .then((data) => {
                        settheFirstBuyersContactNumberIds(data.data);
                        });
client.service("currencyCodes")
                        .find({ query: { $select: ["_id","currencyCode"] } })
                        .then((data) => {
                        setinvoiceCurrencyIds(data.data);
                        });
client.service("frequencyOfBilling")
                        .find({ query: { $select: ["_id","frequencyOfBilling"] } })
                        .then((data) => {
                        setfrequencyOfBillingIds(data.data);
                        });
client.service("paymentModes")
                        .find({ query: { $select: ["_id","paymentMode"] } })
                        .then((data) => {
                        setpaymentModeIds(data.data);
                        });
client.service("team")
                        .find({ query: { $select: ["_id","name"] } })
                        .then((data) => {
                        setteamIds(data.data);
                        });
client.service("invoices")
                        .find({ query: { $select: ["_id","invoiceType"] } })
                        .then((data) => {
                        setinvoiceIdIds(data.data);
                        });

        setErrors([]);
    }, [props.show]);

    const onRun = async () => {
        let fakeData = buyersFakerFactory(props.user,fakerCount,buyersNameIds,identifierTypeIds,buyersAddressCountryNameIds,buyersAddressStateNameIds,theFirstBuyersContactNumberIds,invoiceCurrencyIds,frequencyOfBillingIds,paymentModeIds,teamIds,invoiceIdIds);

        setLoading(true);
        const promises = fakeData.map((elem) => client.service("buyers").create(elem));
        const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
        const errors = results.filter((result) => result instanceof Error).map((err, index) => `[${index}] ${getSchemaValidationErrorsStrings(err) || "Failed to create fake record"}`);
        const validResults = results.filter((result) => !(result instanceof Error));
        props.alert({ type: "success", title: "Faker", message: "Faker ran successfully" });
        props.onFakerCreateResults(validResults);
        setErrors(errors);
        setLoading(false);
        if (!(errors && errors.length)) props.onHide();
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="run" className="p-button-text no-focus-effect" onClick={onRun} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const onChangeFakerCountHandler = (e) => {
        let val = e.target.value;
        val = Number(val);
        if (val < 1) val = 1;
        if (val > 100) val = 100;
        setFakerCount(val);
    };

    return (
        <Dialog header="Faker" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div>
                <div>
                    <p className="m-0">Faker count:</p>
                    <InputText className="w-full mb-3" type="number" value={fakerCount} onChange={onChangeFakerCountHandler} />
                </div>

                <small className="p-error">
                    {Array.isArray(errors)
                        ? errors.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : errors}
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

export default connect(mapState, mapDispatch)(BuyersFakerDialogComponent);
