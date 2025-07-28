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


const SingleShippingPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [shippingRecipientsName, setShippingRecipientsName] = useState([]);
const [shippingRecipientsAddressCountryName, setShippingRecipientsAddressCountryName] = useState([]);
const [shippingRecipientsAddressStateName, setShippingRecipientsAddressStateName] = useState([]);
const [shippingRecipientsIdentifierType, setShippingRecipientsIdentifierType] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("shipping")
            .get(urlParams.singleShippingId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"shippingRecipientsName","shippingRecipientsAddressCountryName","shippingRecipientsAddressStateName","shippingRecipientsIdentifierType"] }})
            .then((res) => {
                set_entity(res || {});
                const shippingRecipientsName = Array.isArray(res.shippingRecipientsName)
            ? res.shippingRecipientsName.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.shippingRecipientsName
                ? [{ _id: res.shippingRecipientsName._id, name: res.shippingRecipientsName.name }]
                : [];
        setShippingRecipientsName(shippingRecipientsName);
const shippingRecipientsAddressCountryName = Array.isArray(res.shippingRecipientsAddressCountryName)
            ? res.shippingRecipientsAddressCountryName.map((elem) => ({ _id: elem._id, countryCode: elem.countryCode }))
            : res.shippingRecipientsAddressCountryName
                ? [{ _id: res.shippingRecipientsAddressCountryName._id, countryCode: res.shippingRecipientsAddressCountryName.countryCode }]
                : [];
        setShippingRecipientsAddressCountryName(shippingRecipientsAddressCountryName);
const shippingRecipientsAddressStateName = Array.isArray(res.shippingRecipientsAddressStateName)
            ? res.shippingRecipientsAddressStateName.map((elem) => ({ _id: elem._id, stateCode: elem.stateCode }))
            : res.shippingRecipientsAddressStateName
                ? [{ _id: res.shippingRecipientsAddressStateName._id, stateCode: res.shippingRecipientsAddressStateName.stateCode }]
                : [];
        setShippingRecipientsAddressStateName(shippingRecipientsAddressStateName);
const shippingRecipientsIdentifierType = Array.isArray(res.shippingRecipientsIdentifierType)
            ? res.shippingRecipientsIdentifierType.map((elem) => ({ _id: elem._id, identifyType: elem.identifyType }))
            : res.shippingRecipientsIdentifierType
                ? [{ _id: res.shippingRecipientsIdentifierType._id, identifyType: res.shippingRecipientsIdentifierType.identifyType }]
                : [];
        setShippingRecipientsIdentifierType(shippingRecipientsIdentifierType);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Shipping", type: "error", message: error.message || "Failed get shipping" });
            });
    }, [props,urlParams.singleShippingId]);


    const goBack = () => {
        navigate("/shipping");
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
                    <h3 className="m-0">Shipping</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>shipping/{urlParams.singleShippingId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Shipping Recipient’s Address

(City name)</label><p className="m-0 ml-3" >{_entity?.shippingRecipientsAddressCityName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Shipping Recipient’s Address

(Postal Zone)</label><p className="m-0 ml-3" >{Number(_entity?.shippingRecipientsAddressPostalZone)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Shipping Recipient's TIN</label><p className="m-0 ml-3" >{_entity?.shippingRecipientsTin}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Business registration number/ Identification number / Passport number</label><p className="m-0 ml-3" >{_entity?.businessRegistrationNumberIdentificationNumberPassportNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Bill  Reference Number</label><p className="m-0 ml-3" >{_entity?.billReferenceNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Reference Number of Customs Form No.1, 9, etc.</label><p className="m-0 ml-3" >{_entity?.referenceNumberOfCustomsFormNo19Etc}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Incoterms</label><p className="m-0 ml-3" >{_entity?.incoterms}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Free Trade Agreement (FTA) Information</label><p className="m-0 ml-3" >{_entity?.freeTradeAgreementFtaInformation}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Authorisation Number for Certified Exporter</label><p className="m-0 ml-3" >{_entity?.authorisationNumberForCertifiedExporter}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Reference Number of Customs Form No.2</label><p className="m-0 ml-3" >{_entity?.referenceNumberOfCustomsFormNo2}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Shipping Recipient's Name</label>
                    {shippingRecipientsName.map((elem) => (
                        <Link key={elem._id} to={`/companies/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Shipping Recipient’s Address

(Country name)</label>
                    {shippingRecipientsAddressCountryName.map((elem) => (
                        <Link key={elem._id} to={`/countryCodes/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.countryCode}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Shipping Recipient’s Address

(State name)</label>
                    {shippingRecipientsAddressStateName.map((elem) => (
                        <Link key={elem._id} to={`/stateCodes/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.stateCode}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Shipping Recipient's Identifier type</label>
                    {shippingRecipientsIdentifierType.map((elem) => (
                        <Link key={elem._id} to={`/identifyType/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.identifyType}</p>
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
        recordId={urlParams.singleShippingId}
        user={props.user}
        alert={props.alert}
        serviceName="shipping"
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

export default connect(mapState, mapDispatch)(SingleShippingPage);
