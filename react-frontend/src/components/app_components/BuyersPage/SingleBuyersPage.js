import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";


const SingleBuyersPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [buyersName, setBuyersName] = useState([]);
const [identifierType, setIdentifierType] = useState([]);
const [buyersAddressCountryName, setBuyersAddressCountryName] = useState([]);
const [buyersAddressStateName, setBuyersAddressStateName] = useState([]);
const [theFirstBuyersContactNumber, setTheFirstBuyersContactNumber] = useState([]);
const [invoiceCurrency, setInvoiceCurrency] = useState([]);
const [frequencyOfBilling, setFrequencyOfBilling] = useState([]);
const [paymentMode, setPaymentMode] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("buyers")
            .get(urlParams.singleBuyersId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"buyersName","identifierType","buyersAddressCountryName","buyersAddressStateName","theFirstBuyersContactNumber","invoiceCurrency","frequencyOfBilling","paymentMode"] }})
            .then((res) => {
                set_entity(res || {});
                const buyersName = Array.isArray(res.buyersName)
            ? res.buyersName.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.buyersName
                ? [{ _id: res.buyersName._id, name: res.buyersName.name }]
                : [];
        setBuyersName(buyersName);
const identifierType = Array.isArray(res.identifierType)
            ? res.identifierType.map((elem) => ({ _id: elem._id, identifyType: elem.identifyType }))
            : res.identifierType
                ? [{ _id: res.identifierType._id, identifyType: res.identifierType.identifyType }]
                : [];
        setIdentifierType(identifierType);
const buyersAddressCountryName = Array.isArray(res.buyersAddressCountryName)
            ? res.buyersAddressCountryName.map((elem) => ({ _id: elem._id, countryCode: elem.countryCode }))
            : res.buyersAddressCountryName
                ? [{ _id: res.buyersAddressCountryName._id, countryCode: res.buyersAddressCountryName.countryCode }]
                : [];
        setBuyersAddressCountryName(buyersAddressCountryName);
const buyersAddressStateName = Array.isArray(res.buyersAddressStateName)
            ? res.buyersAddressStateName.map((elem) => ({ _id: elem._id, stateCode: elem.stateCode }))
            : res.buyersAddressStateName
                ? [{ _id: res.buyersAddressStateName._id, stateCode: res.buyersAddressStateName.stateCode }]
                : [];
        setBuyersAddressStateName(buyersAddressStateName);
const theFirstBuyersContactNumber = Array.isArray(res.theFirstBuyersContactNumber)
            ? res.theFirstBuyersContactNumber.map((elem) => ({ _id: elem._id, phoneNumberPrefix: elem.phoneNumberPrefix }))
            : res.theFirstBuyersContactNumber
                ? [{ _id: res.theFirstBuyersContactNumber._id, phoneNumberPrefix: res.theFirstBuyersContactNumber.phoneNumberPrefix }]
                : [];
        setTheFirstBuyersContactNumber(theFirstBuyersContactNumber);
const invoiceCurrency = Array.isArray(res.invoiceCurrency)
            ? res.invoiceCurrency.map((elem) => ({ _id: elem._id, currencyCode: elem.currencyCode }))
            : res.invoiceCurrency
                ? [{ _id: res.invoiceCurrency._id, currencyCode: res.invoiceCurrency.currencyCode }]
                : [];
        setInvoiceCurrency(invoiceCurrency);
const frequencyOfBilling = Array.isArray(res.frequencyOfBilling)
            ? res.frequencyOfBilling.map((elem) => ({ _id: elem._id, frequencyOfBilling: elem.frequencyOfBilling }))
            : res.frequencyOfBilling
                ? [{ _id: res.frequencyOfBilling._id, frequencyOfBilling: res.frequencyOfBilling.frequencyOfBilling }]
                : [];
        setFrequencyOfBilling(frequencyOfBilling);
const paymentMode = Array.isArray(res.paymentMode)
            ? res.paymentMode.map((elem) => ({ _id: elem._id, paymentMode: elem.paymentMode }))
            : res.paymentMode
                ? [{ _id: res.paymentMode._id, paymentMode: res.paymentMode.paymentMode }]
                : [];
        setPaymentMode(paymentMode);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Buyers", type: "error", message: error.message || "Failed get buyers" });
            });
    }, [props,urlParams.singleBuyersId]);


    const goBack = () => {
        navigate("/buyers");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Buyers</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>buyers/{urlParams.singleBuyersId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Buyer's TIN</label><p className="m-0 ml-3" >{_entity?.buyersTin}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Buyer's SST Registration Number</label><p className="m-0 ml-3" >{_entity?.buyersSstRegistrationNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Business registration number / Identification number / Passport number</label><p className="m-0 ml-3" >{_entity?.businessRegistrationNumberIdentificationNumberPassportNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Buyer's e-mail</label><p className="m-0 ml-3" >{_entity?.buyersEMail}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Buyer's address (City name)</label><p className="m-0 ml-3" >{_entity?.buyersAddressCityName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Buyer's address (Postal zone)</label><p className="m-0 ml-3" >{Number(_entity?.buyersAddressPostalZone)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Buyer's Contact Number</label><p className="m-0 ml-3" >{Number(_entity?.buyersContactNumber)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Currency Exchange Rate</label><p className="m-0 ml-3" >{Number(_entity?.currencyExchangeRate)}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Buyer's name (*)</label>
                    {buyersName.map((elem) => (
                        <Link key={elem._id} to={`/companies/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Identifier Type</label>
                    {identifierType.map((elem) => (
                        <Link key={elem._id} to={`/identifyType/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.identifyType}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Buyer's address (Country name)</label>
                    {buyersAddressCountryName.map((elem) => (
                        <Link key={elem._id} to={`/countryCodes/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.countryCode}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Buyer's address (State name)</label>
                    {buyersAddressStateName.map((elem) => (
                        <Link key={elem._id} to={`/stateCodes/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.stateCode}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">The first buyer's contact number</label>
                    {theFirstBuyersContactNumber.map((elem) => (
                        <Link key={elem._id} to={`/phoneNumberPrefix/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.phoneNumberPrefix}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Invoice Currency</label>
                    {invoiceCurrency.map((elem) => (
                        <Link key={elem._id} to={`/currencyCodes/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.currencyCode}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Frequency of Billing</label>
                    {frequencyOfBilling.map((elem) => (
                        <Link key={elem._id} to={`/frequencyOfBilling/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.frequencyOfBilling}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Payment Mode</label>
                    {paymentMode.map((elem) => (
                        <Link key={elem._id} to={`/paymentModes/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.paymentMode}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        <div className="mt-2">
            <TabView>
                
            </TabView>
        </div>

      <CommentsSection
        recordId={urlParams.singleBuyersId}
        user={props.user}
        alert={props.alert}
        serviceName="buyers"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleBuyersPage);
