import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import TaxTypesPage from "./TaxTypesPage";

const TaxTypeProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <TaxTypesPage />
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

export default connect(mapState, mapDispatch)(TaxTypeProjectLayoutPage);