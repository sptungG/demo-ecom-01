import DeactivatedText from "@dashboard/apps/components/DeactivatedText";
import { useContextualLink } from "@dashboard/components/AppLayout/ContextualLinks/useContextualLink";
import { TopNav } from "@dashboard/components/AppLayout/TopNav";
import { ListPageLayout } from "@dashboard/components/Layouts";
import { TableButtonWrapper } from "@dashboard/components/TableButtonWrapper/TableButtonWrapper";
import TableRowLink from "@dashboard/components/TableRowLink";
import { configurationMenuUrl } from "@dashboard/configuration";
import { CustomAppUrls } from "@dashboard/custom-apps/urls";
import { AppListItemFragment } from "@dashboard/graphql";
import useNavigator from "@dashboard/hooks/useNavigator";
import { sectionNames } from "@dashboard/intl";
import { renderCollection } from "@dashboard/misc";
import { TableBody, TableCell } from "@material-ui/core";
import { ResponsiveTable } from "@saleor/macaw-ui";
import { Box, Button, Text, TrashBinIcon } from "@saleor/macaw-ui-next";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import CustomAppsSkeleton from "../CustomAppsSkeleton";
import { useStyles } from "./styles";

export interface CustomAppListPageProps {
  appsList: AppListItemFragment[];
  getCustomAppHref: (id: string) => string;
  onRemove: (id: string) => void;
}

const CustomAppListPage: React.FC<CustomAppListPageProps> = ({
  appsList,
  onRemove,
  getCustomAppHref,
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const navigate = useNavigator();
  const subtitle = useContextualLink("extending_saleor");

  return (
    <ListPageLayout>
      <TopNav
        title={intl.formatMessage(sectionNames.webhooksAndEvents)}
        subtitle={subtitle}
        href={configurationMenuUrl}
      >
        <Button
          variant="primary"
          onClick={() => navigate(CustomAppUrls.appAddUrl)}
          data-test-id="create-app"
        >
          <FormattedMessage
            id="XB2Jj9"
            defaultMessage="Create App"
            description="create app button"
          />
        </Button>
      </TopNav>
      <Box padding={6}>
        <Box marginBottom={1.5}>
          <Text as="p">
            <FormattedMessage
              defaultMessage="Local apps are custom webhooks & token pairs that can be used to
            connect apps and access API."
              id="L/sNGY"
            />
          </Text>
        </Box>

        <ResponsiveTable>
          <TableBody>
            {renderCollection(
              appsList,
              (app, index) =>
                app ? (
                  <TableRowLink
                    key={app.id}
                    className={classes.tableRow}
                    href={getCustomAppHref(app.id)}
                  >
                    <TableCell className={classes.colName}>
                      <span data-tc="name" className={classes.appName}>
                        {app.name}
                      </span>
                      {!app.isActive && (
                        <div className={classes.statusWrapper}>
                          <DeactivatedText />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className={classes.colAction}>
                      <TableButtonWrapper>
                        <Button
                          icon={<TrashBinIcon />}
                          variant="secondary"
                          onClick={() => onRemove(app.id)}
                        />
                      </TableButtonWrapper>
                    </TableCell>
                  </TableRowLink>
                ) : (
                  <CustomAppsSkeleton key={index} />
                ),
              () => (
                <TableRowLink className={classes.tableRow}>
                  <TableCell className={classes.colName}>
                    <Text className={classes.text} fontSize={3}>
                      <FormattedMessage
                        id="voRaz3"
                        defaultMessage="Your custom-created apps will be shown here."
                        description="custom apps content"
                      />
                    </Text>
                  </TableCell>
                </TableRowLink>
              ),
            )}
          </TableBody>
        </ResponsiveTable>
      </Box>
    </ListPageLayout>
  );
};

CustomAppListPage.displayName = "CustomAppListPage";
export default CustomAppListPage;
