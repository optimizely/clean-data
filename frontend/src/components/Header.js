import { Navigation } from "optimizely-oui";

import openLogoUrl from "@optimizely/design-tokens/dist/brand-assets/brand-logo.svg";

const Header = () => {
  return (
    <Navigation
      theme="light"
      title="Clean Data Report"
      onHelpClick={() => null}
      logoUrl={openLogoUrl}
      className="width--1-1"
    ></Navigation>
  );
};

export default Header;
