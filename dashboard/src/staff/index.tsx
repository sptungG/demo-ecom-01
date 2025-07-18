import { ConditionalStaffMembersFilterProvider } from "@dashboard/components/ConditionalFilter";
import { Route } from "@dashboard/components/Router";
import { sectionNames } from "@dashboard/intl";
import { asSortParams } from "@dashboard/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {
  staffListPath,
  StaffListUrlQueryParams,
  StaffListUrlSortField,
  staffMemberDetailsPath,
  StaffMemberDetailsUrlQueryParams,
} from "./urls";
import StaffDetailsComponent from "./views/StaffDetails";
import StaffListComponent from "./views/StaffList";

const StaffList: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1)) as any;
  const params: StaffListUrlQueryParams = asSortParams(qs, StaffListUrlSortField);

  return (
    <ConditionalStaffMembersFilterProvider locationSearch={location.search}>
      <StaffListComponent params={params} />
    </ConditionalStaffMembersFilterProvider>
  );
};

interface StaffDetailsRouteProps {
  id: string;
}

const StaffDetails: React.FC<RouteComponentProps<StaffDetailsRouteProps>> = ({ match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: StaffMemberDetailsUrlQueryParams = qs;

  return <StaffDetailsComponent id={decodeURIComponent(match.params.id)} params={params} />;
};
const Component = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.staff)} />
      <Switch>
        <Route exact path={staffListPath} render={() => <></>} />
        <Route path={staffMemberDetailsPath(":id")} component={StaffDetails} />
      </Switch>
    </>
  );
};

export default Component;
