import React, { useEffect } from 'react';
import Sidebar from 'components/organisms/Sidebar';
import AccountHeader, {
  AccountHeaderProps,
} from 'components/templates/AccountHeader';
import { accountLinks } from 'utils/lang';
import type { Settings } from 'stores/settings';
import useSettingsStore from 'stores/settings';
import { pageTitleMap } from 'utils/lang';
import type { AccountPageProps } from 'types/shared/pages';

export interface AccountLayoutProps extends Pick<AccountPageProps, 'pageType'> {
  header: AccountHeaderProps;
  settings: Settings;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  children,
  header,
  settings,
  pageType,
}) => {
  const setSettings = useSettingsStore((state) => state.setSettings);
  const lang = useSettingsStore((state) => state.settings?.lang);
  const links = accountLinks(lang);

  // Stores settings retrieved server-side on the client-side store.
  useEffect(() => {
    if (settings) {
      setSettings(settings);
    }
  }, [setSettings, settings]);
  return (
    <div>
      <AccountHeader
        {...header}
        pageTitle={pageTitleMap(lang)[pageType]}
        mobileMenuLinks={links}
      />
      <div className="p-6 md:flex md:gap-20 md:px-14 md:pt-16 md:pb-12">
        <Sidebar links={links} accountDetails={header.accountDetails} />
        <main className="flex-grow">{children}</main>
      </div>
    </div>
  );
};

export default AccountLayout;
