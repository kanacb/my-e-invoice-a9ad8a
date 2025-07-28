import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";

const ShippingDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user,   selectedDelete,
  setSelectedDelete, onCreateResult}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);

const dropdownTemplate0 = (rowData, { rowIndex }) => <p >{rowData.shippingRecipientsName?.name}</p>
const dropdownTemplate1 = (rowData, { rowIndex }) => <p >{rowData.shippingRecipientsAddressCountryName?.countryCode}</p>
const dropdownTemplate2 = (rowData, { rowIndex }) => <p >{rowData.shippingRecipientsAddressStateName?.stateCode}</p>
const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.shippingRecipientsAddressCityName}</p>
const p_numberTemplate4 = (rowData, { rowIndex }) => <p >{rowData.shippingRecipientsAddressPostalZone}</p>
const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.shippingRecipientsTin}</p>
const dropdownTemplate6 = (rowData, { rowIndex }) => <p >{rowData.shippingRecipientsIdentifierType?.identifyType}</p>
const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.businessRegistrationNumberIdentificationNumberPassportNumber}</p>
const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.billReferenceNumber}</p>
const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.referenceNumberOfCustomsFormNo19Etc}</p>
const pTemplate10 = (rowData, { rowIndex }) => <p >{rowData.incoterms}</p>
const inputTextareaTemplate11 = (rowData, { rowIndex }) => <p >{rowData.freeTradeAgreementFtaInformation}</p>
const pTemplate12 = (rowData, { rowIndex }) => <p >{rowData.authorisationNumberForCertifiedExporter}</p>
const pTemplate13 = (rowData, { rowIndex }) => <p >{rowData.referenceNumberOfCustomsFormNo2}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
      const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };
    
  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

    return (
        <>
        <DataTable 
           value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
        >
                <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
<Column field="shippingRecipientsName" header="Shipping Recipient's Name" body={dropdownTemplate0} filter={selectedFilterFields.includes("shippingRecipientsName")} hidden={selectedHideFields?.includes("shippingRecipientsName")}  style={{ minWidth: "8rem" }} />
<Column field="shippingRecipientsAddressCountryName" header="Shipping Recipient’s Address

(Country name)" body={dropdownTemplate1} filter={selectedFilterFields.includes("shippingRecipientsAddressCountryName")} hidden={selectedHideFields?.includes("shippingRecipientsAddressCountryName")}  style={{ minWidth: "8rem" }} />
<Column field="shippingRecipientsAddressStateName" header="Shipping Recipient’s Address

(State name)" body={dropdownTemplate2} filter={selectedFilterFields.includes("shippingRecipientsAddressStateName")} hidden={selectedHideFields?.includes("shippingRecipientsAddressStateName")}  style={{ minWidth: "8rem" }} />
<Column field="shippingRecipientsAddressCityName" header="Shipping Recipient’s Address

(City name)" body={pTemplate3} filter={selectedFilterFields.includes("shippingRecipientsAddressCityName")} hidden={selectedHideFields?.includes("shippingRecipientsAddressCityName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="shippingRecipientsAddressPostalZone" header="Shipping Recipient’s Address

(Postal Zone)" body={p_numberTemplate4} filter={selectedFilterFields.includes("shippingRecipientsAddressPostalZone")} hidden={selectedHideFields?.includes("shippingRecipientsAddressPostalZone")}  sortable style={{ minWidth: "8rem" }} />
<Column field="shippingRecipientsTin" header="Shipping Recipient's TIN" body={pTemplate5} filter={selectedFilterFields.includes("shippingRecipientsTin")} hidden={selectedHideFields?.includes("shippingRecipientsTin")}  sortable style={{ minWidth: "8rem" }} />
<Column field="shippingRecipientsIdentifierType" header="Shipping Recipient's Identifier type" body={dropdownTemplate6} filter={selectedFilterFields.includes("shippingRecipientsIdentifierType")} hidden={selectedHideFields?.includes("shippingRecipientsIdentifierType")}  style={{ minWidth: "8rem" }} />
<Column field="businessRegistrationNumberIdentificationNumberPassportNumber" header="Business registration number/ Identification number / Passport number" body={pTemplate7} filter={selectedFilterFields.includes("businessRegistrationNumberIdentificationNumberPassportNumber")} hidden={selectedHideFields?.includes("businessRegistrationNumberIdentificationNumberPassportNumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="billReferenceNumber" header="Bill  Reference Number" body={pTemplate8} filter={selectedFilterFields.includes("billReferenceNumber")} hidden={selectedHideFields?.includes("billReferenceNumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="referenceNumberOfCustomsFormNo19Etc" header="Reference Number of Customs Form No.1, 9, etc." body={pTemplate9} filter={selectedFilterFields.includes("referenceNumberOfCustomsFormNo19Etc")} hidden={selectedHideFields?.includes("referenceNumberOfCustomsFormNo19Etc")}  sortable style={{ minWidth: "8rem" }} />
<Column field="incoterms" header="Incoterms" body={pTemplate10} filter={selectedFilterFields.includes("incoterms")} hidden={selectedHideFields?.includes("incoterms")}  sortable style={{ minWidth: "8rem" }} />
<Column field="freeTradeAgreementFtaInformation" header="Free Trade Agreement (FTA) Information" body={inputTextareaTemplate11} filter={selectedFilterFields.includes("freeTradeAgreementFtaInformation")} hidden={selectedHideFields?.includes("freeTradeAgreementFtaInformation")}  sortable style={{ minWidth: "8rem" }} />
<Column field="authorisationNumberForCertifiedExporter" header="Authorisation Number for Certified Exporter" body={pTemplate12} filter={selectedFilterFields.includes("authorisationNumberForCertifiedExporter")} hidden={selectedHideFields?.includes("authorisationNumberForCertifiedExporter")}  sortable style={{ minWidth: "8rem" }} />
<Column field="referenceNumberOfCustomsFormNo2" header="Reference Number of Customs Form No.2" body={pTemplate13} filter={selectedFilterFields.includes("referenceNumberOfCustomsFormNo2")} hidden={selectedHideFields?.includes("referenceNumberOfCustomsFormNo2")}  sortable style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>


      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}


        <Dialog header="Upload Shipping Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="shipping"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search Shipping" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default ShippingDataTable;