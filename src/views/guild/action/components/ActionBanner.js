import React from "react";

import bannerImg from "assets/img/common/ActionBanner.jpg";

import {useActionInfo} from "contexts/actions/ActionDetailContext";
import Banner from "components/card/Banner";
import {useLocale} from "utils/Language";

export default function ActionBanner({children}) {
  const {name, description, banner} = useActionInfo()
  const locale = useLocale()

  return (
      <Banner image={banner || bannerImg} title={locale(name)} description={description}>
        {children}
      </Banner>
  );
}