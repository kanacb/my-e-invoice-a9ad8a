import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";

const SuppliersDataTable = ({
  items,
  fields,
  onEditRow,
  onRowDelete,
  onRowClick,
  searchDialog,
  setSearchDialog,
  showUpload,
  setShowUpload,
  showFilter,
  setShowFilter,
  showColumns,
  setShowColumns,
  onClickSaveFilteredfields,
  selectedFilterFields,
  setSelectedFilterFields,
  selectedHideFields,
  setSelectedHideFields,
  onClickSaveHiddenfields,
  loading,
  user,
  selectedDelete,
  setSelectedDelete,
  onCreateResult,
}) => {
  const dt = useRef(null);
  const urlParams = useParams();
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);

  const dropdownTemplate0 = (rowData, { rowIndex }) => (
    <p>{rowData.suppliersName?.name}</p>
  );
  const pTemplate1 = (rowData, { rowIndex }) => <p>{rowData.suppliersTin}</p>;
  const pTemplate2 = (rowData, { rowIndex }) => (
    <p>{rowData.suppliersSstRegistrationNumber}</p>
  );
  const dropdownTemplate3 = (rowData, { rowIndex }) => (
    <p>{rowData.identifierType?.identifyType}</p>
  );
  const pTemplate4 = (rowData, { rowIndex }) => (
    <p>{rowData.identifierNumber}</p>
  );
  const pTemplate5 = (rowData, { rowIndex }) => (
    <p>{rowData.suppliersMsicCode}</p>
  );
  const pTemplate6 = (rowData, { rowIndex }) => (
    <p>{rowData.suppliersTourismTaxRegistrationNumber}</p>
  );
  const pTemplate7 = (rowData, { rowIndex }) => (
    <p>{rowData.suppliersBusinessActivityDescription}</p>
  );
  const pTemplate8 = (rowData, { rowIndex }) => <p>{rowData.suppliersEMail}</p>;
  const dropdownTemplate9 = (rowData, { rowIndex }) => (
    <p>{rowData.theFirstSuppliersContactNumber?.phoneNumberPrefix}</p>
  );
  const pTemplate10 = (rowData, { rowIndex }) => (
    <p>{rowData.suppliersContactNumber}</p>
  );
  const dropdownTemplate11 = (rowData, { rowIndex }) => (
    <p>{rowData.countryName?.countryCode}</p>
  );
  const dropdownTemplate12 = (rowData, { rowIndex }) => (
    <p>{rowData.stateName?.stateCode}</p>
  );
  const pTemplate13 = (rowData, { rowIndex }) => <p>{rowData.cityName}</p>;
  const pTemplate14 = (rowData, { rowIndex }) => <p>{rowData.postalZone}</p>;
  const p_numberTemplate15 = (rowData, { rowIndex }) => (
    <p>{rowData.suppliersBankAccountNumber}</p>
  );
  const pTemplate16 = (rowData, { rowIndex }) => <p>{rowData.paymentTerms}</p>;
  const p_numberTemplate17 = (rowData, { rowIndex }) => (
    <p>{rowData.prePaymentAmount}</p>
  );
  const p_calendarTemplate18 = (rowData, { rowIndex }) => (
    <p>{rowData.prePaymentDate}</p>
  );
  const pTemplate19 = (rowData, { rowIndex }) => (
    <p>{rowData.prePaymentReferenceNumber}</p>
  );
  const editTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onEditRow(rowData, rowIndex)}
      icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`}
      className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`}
    />
  );
  const deleteTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onRowDelete(rowData._id)}
      icon="pi pi-times"
      className="p-button-rounded p-button-danger p-button-text"
    />
  );

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
        <Column
          field="suppliersName"
          header="Supplier's Name"
          body={dropdownTemplate0}
          filter={selectedFilterFields.includes("suppliersName")}
          hidden={selectedHideFields?.includes("suppliersName")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="suppliersTin"
          header="Supplier's TIN"
          body={pTemplate1}
          filter={selectedFilterFields.includes("suppliersTin")}
          hidden={selectedHideFields?.includes("suppliersTin")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="suppliersSstRegistrationNumber"
          header="Supplier's SST Registration Number"
          body={pTemplate2}
          filter={selectedFilterFields.includes(
            "suppliersSstRegistrationNumber",
          )}
          hidden={selectedHideFields?.includes(
            "suppliersSstRegistrationNumber",
          )}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="identifierType"
          header="Identifier Type"
          body={dropdownTemplate3}
          filter={selectedFilterFields.includes("identifierType")}
          hidden={selectedHideFields?.includes("identifierType")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="identifierNumber"
          header="Identifier Number"
          body={pTemplate4}
          filter={selectedFilterFields.includes("identifierNumber")}
          hidden={selectedHideFields?.includes("identifierNumber")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="suppliersMsicCode"
          header="Supplier's MSIC code"
          body={pTemplate5}
          filter={selectedFilterFields.includes("suppliersMsicCode")}
          hidden={selectedHideFields?.includes("suppliersMsicCode")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="suppliersTourismTaxRegistrationNumber"
          header="Supplier's Tourism Tax Registration Number"
          body={pTemplate6}
          filter={selectedFilterFields.includes(
            "suppliersTourismTaxRegistrationNumber",
          )}
          hidden={selectedHideFields?.includes(
            "suppliersTourismTaxRegistrationNumber",
          )}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="suppliersBusinessActivityDescription"
          header="Supplier's Business Activity Description"
          body={pTemplate7}
          filter={selectedFilterFields.includes(
            "suppliersBusinessActivityDescription",
          )}
          hidden={selectedHideFields?.includes(
            "suppliersBusinessActivityDescription",
          )}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="suppliersEMail"
          header="Supplier's e-mail"
          body={pTemplate8}
          filter={selectedFilterFields.includes("suppliersEMail")}
          hidden={selectedHideFields?.includes("suppliersEMail")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="theFirstSuppliersContactNumber"
          header="The first Supplier's contact number"
          body={dropdownTemplate9}
          filter={selectedFilterFields.includes(
            "theFirstSuppliersContactNumber",
          )}
          hidden={selectedHideFields?.includes(
            "theFirstSuppliersContactNumber",
          )}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="suppliersContactNumber"
          header="Supplier's contact number"
          body={pTemplate10}
          filter={selectedFilterFields.includes("suppliersContactNumber")}
          hidden={selectedHideFields?.includes("suppliersContactNumber")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="countryName"
          header="Country name"
          body={dropdownTemplate11}
          filter={selectedFilterFields.includes("countryName")}
          hidden={selectedHideFields?.includes("countryName")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="stateName"
          header="State name"
          body={dropdownTemplate12}
          filter={selectedFilterFields.includes("stateName")}
          hidden={selectedHideFields?.includes("stateName")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="cityName"
          header="City name"
          body={pTemplate13}
          filter={selectedFilterFields.includes("cityName")}
          hidden={selectedHideFields?.includes("cityName")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="postalZone"
          header="Postal zone"
          body={pTemplate14}
          filter={selectedFilterFields.includes("postalZone")}
          hidden={selectedHideFields?.includes("postalZone")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="suppliersBankAccountNumber"
          header="Supplier's Bank Account Number"
          body={p_numberTemplate15}
          filter={selectedFilterFields.includes("suppliersBankAccountNumber")}
          hidden={selectedHideFields?.includes("suppliersBankAccountNumber")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="paymentTerms"
          header="Payment Terms"
          body={pTemplate16}
          filter={selectedFilterFields.includes("paymentTerms")}
          hidden={selectedHideFields?.includes("paymentTerms")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="prePaymentAmount"
          header="PrePayment Amount"
          body={p_numberTemplate17}
          filter={selectedFilterFields.includes("prePaymentAmount")}
          hidden={selectedHideFields?.includes("prePaymentAmount")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="prePaymentDate"
          header="PrePayment Date"
          body={p_calendarTemplate18}
          filter={selectedFilterFields.includes("prePaymentDate")}
          hidden={selectedHideFields?.includes("prePaymentDate")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="prePaymentReferenceNumber"
          header="PrePayment Reference Number"
          body={pTemplate19}
          filter={selectedFilterFields.includes("prePaymentReferenceNumber")}
          hidden={selectedHideFields?.includes("prePaymentReferenceNumber")}
          sortable
          style={{ minWidth: "8rem" }}
        />
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

      <Dialog
        header="Upload Suppliers Data"
        visible={showUpload}
        onHide={() => setShowUpload(false)}
      >
        <UploadService
          user={user}
          serviceName="suppliers"
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}
        />
      </Dialog>

      <Dialog
        header="Search Suppliers"
        visible={searchDialog}
        onHide={() => setSearchDialog(false)}
      >
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
            setShowFilter(false);
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
            setShowColumns(false);
          }}
        ></Button>
      </Dialog>
    </>
  );
};

export default SuppliersDataTable;
