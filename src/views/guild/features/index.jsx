import React, {useContext} from "react";

// Custom components
import FeatureGrid from "./components/FeatureGrid";
import {FeaturesContext, FeaturesProvider} from "contexts/FeaturesContext";
import {DataList} from "components/card/data/DataCard";
import {config} from "config/config";
import {Locale, useLocale} from "utils/Language";
import {useLayoutUpdate} from "contexts/layouts/LayoutContext";
import {BannerButton} from "components/card/Banner";
import {FaTripadvisor} from "react-icons/fa";

export default function FeaturesBoard() {

  return (
      <FeaturesProvider>
        <Content />
      </FeaturesProvider>
  );
}

function Content() {
  const {data} = useContext(FeaturesContext)
  const locale = useLocale()

  useLayoutUpdate({
    banner: {
      title: locale({
        zh: "在線管理所有功能",
        en: `Features Panel`
      }),
      description: locale({
        zh: `發掘、學習、以及客製化${config.name}強大的功能`,
        en: `Discover, Learn, And Customize the Powerful Features of ${config.name}`
      }),
      buttons: [
        config.tutorialUrl && <TutorialButton />
      ]
    },
    dataList: config.data.features && <DataList items={config.data.features(data)} />
  })

  return <FeatureGrid />
}

function TutorialButton() {
  return  <BannerButton
      leftIcon={<FaTripadvisor size={20}/>}
      url={config.tutorialUrl}
  >
    <Locale zh="發現它們" en="Discover"/>
  </BannerButton>
}