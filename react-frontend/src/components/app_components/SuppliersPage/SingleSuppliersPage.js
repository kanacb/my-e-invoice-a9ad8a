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


const SingleSuppliersPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [suppliersName, setSuppliersName] = useState([]);
const [identifierType, setIdentifierType] = useState([]);
const [theFirstSuppliersContactNumber, setTheFirstSuppliersContactNumber] = useState([]);
const [countryName, setCountryName] = useState([]);
const [stateName, setStateName] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("suppliers")
            .get(urlParams.singleSuppliersId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"suppliersName","identifierType","theFirstSuppliersContactNumber","countryName","stateName"] }})
            .then((res) => {
                set_entity(res || {});
                const suppliersName = Array.isArray(res.suppliersName)
            ? res.suppliersName.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.suppliersName
                ? [{ _id: res.suppliersName._id, name: res.suppliersName.name }]
                : [];
        setSuppliersName(suppliersName);
const identifierType = Array.isArray(res.identifierType)
            ? res.identifierType.map((elem) => ({ _id: elem._id, identifyType: elem.identifyType }))
            : res.identifierType
                ? [{ _id: res.identifierType._id, identifyType: res.identifierType.identifyType }]
                : [];
        setIdentifierType(identifierType);
const theFirstSuppliersContactNumber = Array.isArray(res.theFirstSuppliersContactNumber)
            ? res.theFirstSuppliersContactNumber.map((elem) => ({ _id: elem._id, phoneNumberPrefix: elem.phoneNumberPrefix }))
            : res.theFirstSuppliersContactNumber
                ? [{ _id: res.theFirstSuppliersContactNumber._id, phoneNumberPrefix: res.theFirstSuppliersContactNumber.phoneNumberPrefix }]
                : [];
        setTheFirstSuppliersContactNumber(theFirstSuppliersContactNumber);
const countryName = Array.isArray(res.countryName)
            ? res.countryName.map((elem) => ({ _id: elem._id, countryCode: elem.countryCode }))
            : res.countryName
                ? [{ _id: res.countryName._id, countryCode: res.countryName.countryCode }]
                : [];
        setCountryName(countryName);
const stateName = Array.isArray(res.stateName)
            ? res.stateName.map((elem) => ({ _id: elem._id, stateCode: elem.stateCode }))
            : res.stateName
                ? [{ _id: res.stateName._id, stateCode: res.stateName.stateCode }]
                : [];
        setStateName(stateName);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Suppliers", type: "error", message: error.message || "Failed get suppliers" });
            });
    }, [props,urlParams.singleSuppliersId]);


    const goBack = () => {
        navigate("/suppliers");
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
                    <h3 className="m-0">Suppliers</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>suppliers/{urlParams.singleSuppliersId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Supplier's TIN</label><p className="m-0 ml-3" >{_entity?.suppliersTin}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Supplier's SST Registration Number</label><p className="m-0 ml-3" >{_entity?.suppliersSstRegistrationNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Identifier Number</label><p className="m-0 ml-3" >{_entity?.identifierNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Supplier's MSIC code</label><p className="m-0 ml-3" >{_entity?.suppliersMsicCode}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Supplier's Tourism Tax Registration Number</label><p className="m-0 ml-3" >{_entity?.suppliersTourismTaxRegistrationNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Supplier's Business Activity Description</label><p className="m-0 ml-3" >{_entity?.suppliersBusinessActivityDescription}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Supplier's e-mail</label><p className="m-0 ml-3" >{_entity?.suppliersEMail}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Supplier's contact number</label><p className="m-0 ml-3" >{_entity?.suppliersContactNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">City name</label><p className="m-0 ml-3" >{_entity?.cityName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Postal zone</label><p className="m-0 ml-3" >{_entity?.postalZone}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Supplier's Bank Account Number</label><p className="m-0 ml-3" >{Number(_entity?.suppliersBankAccountNumber)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Payment Terms</label><p className="m-0 ml-3" >{_entity?.paymentTerms}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">PrePayment Amount</label><p className="m-0 ml-3" >{Number(_entity?.prePaymentAmount)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">PrePayment Date</label><p id="prePaymentDate" className="m-0 ml-3" >{_entity?.prePaymentDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">PrePayment Reference Number</label><p className="m-0 ml-3" >{_entity?.prePaymentReferenceNumber}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Supplier's Name</label>
                    {suppliersName.map((elem) => (
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
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">The first Supplier's contact number</label>
                    {theFirstSuppliersContactNumber.map((elem) => (
                        <Link key={elem._id} to={`/phoneNumberPrefix/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.phoneNumberPrefix}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Country name</label>
                    {countryName.map((elem) => (
                        <Link key={elem._id} to={`/countryCodes/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.countryCode}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">State name</label>
                    {stateName.map((elem) => (
                        <Link key={elem._id} to={`/stateCodes/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.stateCode}</p>
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
        recordId={urlParams.singleSuppliersId}
        user={props.user}
        alert={props.alert}
        serviceName="suppliers"
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

export default connect(mapState, mapDispatch)(SingleSuppliersPage);
