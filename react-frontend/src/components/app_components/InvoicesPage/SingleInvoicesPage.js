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

import ProductsPage from "../ProductsPage/ProductsPage";
import SuppliersPage from "../SuppliersPage/SuppliersPage";
import BuyersPage from "../BuyersPage/BuyersPage";

const SingleInvoicesPage = (props) => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

  const [invoiceType, setInvoiceType] = useState([]);
  const [classification, setClassification] = useState([]);
  const [countryOfOrigin, setCountryOfOrigin] = useState([]);
  const [taxType1, setTaxType1] = useState([]);
  const [buyer, setBuyer] = useState([]);
  const [supplier, setSupplier] = useState([]);

  useEffect(() => {
    //on mount
    client
      .service("invoices")
      .get(urlParams.singleInvoicesId, {
        query: {
          $populate: [
            {
              path: "createdBy",
              service: "users",
              select: ["name"],
            },
            {
              path: "updatedBy",
              service: "users",
              select: ["name"],
            },
            "invoiceType",
            "classification",
            "countryOfOrigin",
            "taxType1",
            "buyer",
            "supplier",
          ],
        },
      })
      .then((res) => {
        set_entity(res || {});
        const invoiceType = Array.isArray(res.invoiceType)
          ? res.invoiceType.map((elem) => ({
              _id: elem._id,
              eInvoiceTypes: elem.eInvoiceTypes,
            }))
          : res.invoiceType
            ? [
                {
                  _id: res.invoiceType._id,
                  eInvoiceTypes: res.invoiceType.eInvoiceTypes,
                },
              ]
            : [];
        setInvoiceType(invoiceType);
        const classification = Array.isArray(res.classification)
          ? res.classification.map((elem) => ({
              _id: elem._id,
              classificationCode: elem.classificationCode,
            }))
          : res.classification
            ? [
                {
                  _id: res.classification._id,
                  classificationCode: res.classification.classificationCode,
                },
              ]
            : [];
        setClassification(classification);
        const countryOfOrigin = Array.isArray(res.countryOfOrigin)
          ? res.countryOfOrigin.map((elem) => ({
              _id: elem._id,
              countryCode: elem.countryCode,
            }))
          : res.countryOfOrigin
            ? [
                {
                  _id: res.countryOfOrigin._id,
                  countryCode: res.countryOfOrigin.countryCode,
                },
              ]
            : [];
        setCountryOfOrigin(countryOfOrigin);
        const taxType1 = Array.isArray(res.taxType1)
          ? res.taxType1.map((elem) => ({
              _id: elem._id,
              taxType: elem.taxType,
            }))
          : res.taxType1
            ? [{ _id: res.taxType1._id, taxType: res.taxType1.taxType }]
            : [];
        setTaxType1(taxType1);
        const buyer = Array.isArray(res.buyer)
          ? res.buyer.map((elem) => ({ _id: elem._id, name: elem.name }))
          : res.buyer
            ? [{ _id: res.buyer._id, name: res.buyer.name }]
            : [];
        setBuyer(buyer);
        const supplier = Array.isArray(res.supplier)
          ? res.supplier.map((elem) => ({ _id: elem._id, name: elem.name }))
          : res.supplier
            ? [{ _id: res.supplier._id, name: res.supplier.name }]
            : [];
        setSupplier(supplier);
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Invoices",
          type: "error",
          message: error.message || "Failed get invoices",
        });
      });
  }, [props, urlParams.singleInvoicesId]);

  const goBack = () => {
    navigate("/invoices");
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
              <Button
                className="p-button-text"
                icon="pi pi-chevron-left"
                onClick={() => goBack()}
              />
              <h3 className="m-0">Invoices</h3>
              <SplitButton
                model={menuItems.filter(
                  (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                )}
                dropdownIcon="pi pi-ellipsis-h"
                buttonClassName="hidden"
                menuButtonClassName="ml-1 p-button-text"
              />
            </div>

            {/* <p>invoices/{urlParams.singleInvoicesId}</p> */}
          </div>
          <div className="card w-full">
            <div className="grid ">
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Invoice Date and Time
                </label>
                <p id="invoiceDateAndTime" className="m-0 ml-3">
                  {_entity?.invoiceDateAndTime}
                </p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Original e-Invoice Reference Number
                </label>
                <p className="m-0 ml-3">
                  {_entity?.originalEInvoiceReferenceNumber}
                </p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">No</label>
                <p className="m-0 ml-3">{Number(_entity?.no)}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Tax Rate (%)</label>
                <p className="m-0 ml-3">{_entity?.taxRate}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Tax Amount</label>
                <p className="m-0 ml-3">{_entity?.taxAmount}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Details of Exemption
                </label>
                <p className="m-0 ml-3">{_entity?.detailsOfExemption}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Amount Exempted</label>
                <p className="m-0 ml-3">{_entity?.amountExempted}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Discount Rate (%)
                </label>
                <p className="m-0 ml-3">{_entity?.discountRate}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Discount Amount</label>
                <p className="m-0 ml-3">{_entity?.discountAmount}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Description_1</label>
                <p className="m-0 ml-3">{_entity?.description1}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Fee/Charge Rate (%)
                </label>
                <p className="m-0 ml-3">{_entity?.feeChargeRate}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Fee/Charge Amount
                </label>
                <p className="m-0 ml-3">{_entity?.feeChargeAmount}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Total Taxable Amount per Tax Type
                </label>
                <p className="m-0 ml-3">
                  {_entity?.totalTaxableAmountPerTaxType}
                </p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Total Tax Amount Per Tax Type
                </label>
                <p className="m-0 ml-3">{_entity?.totalTaxAmountPerTaxType}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Details of Tax Exemption
                </label>
                <p className="m-0 ml-3">{_entity?.detailsOfTaxExemption}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Amount Exempted from Tax
                </label>
                <p className="m-0 ml-3">
                  {Number(_entity?.amountExemptedFromTax)}
                </p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Discount Amount_1
                </label>
                <p className="m-0 ml-3">{Number(_entity?.discountAmount1)}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Description_3</label>
                <p className="m-0 ml-3">{_entity?.description3}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Fee Amount</label>
                <p className="m-0 ml-3">{Number(_entity?.feeAmount)}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Description_4</label>
                <p className="m-0 ml-3">{_entity?.description4}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Invoice Number</label>
                <p className="m-0 ml-3">{_entity?.invoiceNumber}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Consolidated</label>
                <p className="m-0">
                  <i
                    id="consolidated"
                    className={`pi ${_entity?.consolidated ? "pi-check" : "pi-times"}`}
                  ></i>
                </p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Invoice Type</label>
                {invoiceType.map((elem) => (
                  <Link key={elem._id} to={`/eInvoiceTypes/${elem._id}`}>
                    <div>
                      {" "}
                      <p className="text-xl text-primary">
                        {elem.eInvoiceTypes}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Classification</label>
                {classification.map((elem) => (
                  <Link key={elem._id} to={`/classificationCodes/${elem._id}`}>
                    <div>
                      {" "}
                      <p className="text-xl text-primary">
                        {elem.classificationCode}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Country of Origin
                </label>
                {countryOfOrigin.map((elem) => (
                  <Link key={elem._id} to={`/countryCodes/${elem._id}`}>
                    <div>
                      {" "}
                      <p className="text-xl text-primary">{elem.countryCode}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Tax Type _1</label>
                {taxType1.map((elem) => (
                  <Link key={elem._id} to={`/taxTypes/${elem._id}`}>
                    <div>
                      {" "}
                      <p className="text-xl text-primary">{elem.taxType}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Buyer</label>
                {buyer.map((elem) => (
                  <Link key={elem._id} to={`/companies/${elem._id}`}>
                    <div>
                      {" "}
                      <p className="text-xl text-primary">{elem.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Supplier</label>
                {supplier.map((elem) => (
                  <Link key={elem._id} to={`/companies/${elem._id}`}>
                    <div>
                      {" "}
                      <p className="text-xl text-primary">{elem.name}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="col-12">&nbsp;</div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <TabView>
            <TabPanel header="true" leftIcon="pi pi-building-columns mr-2">
              <ProductsPage />
            </TabPanel>

            <TabPanel header="true" leftIcon="pi pi-building-columns mr-2">
              <SuppliersPage />
            </TabPanel>

            <TabPanel header="true" leftIcon="pi pi-building-columns mr-2">
              <BuyersPage />
            </TabPanel>
          </TabView>
        </div>

        <CommentsSection
          recordId={urlParams.singleInvoicesId}
          user={props.user}
          alert={props.alert}
          serviceName="invoices"
        />
        <div
          id="rightsidebar"
          className={classNames(
            "overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out",
            { hidden: !isHelpSidebarVisible },
          )}
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

export default connect(mapState, mapDispatch)(SingleInvoicesPage);
