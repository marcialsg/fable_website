import React from "react";
import ComboBoxYear from "./ComboBoxYear";
import sdg from "../data/sdg";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

/* Banner que estará en todas las páginas */
const BannerTitle = (year, title, sdgIndex, bannerBackgroundColor) => {
  var backgroundColor = "#888888";
  var targetImage = "";

  // const useStyles = makeStyles({
  //   custom: {
  //     color: "white",
  //     fontWeight: "bold",
  //     fontSize: "36px",
  //     fontFamily: "proxima nova",
  //     fontStyle: "sans-serif",
  //   }
  // });

  // const classes = useStyles();

  // const getItemTypography = (text) => {
  //   return (
  //     <Typography variant="h4" className={classes.custom}>
  //       {text}
  //     </Typography>
  //   );
  // };

  if (sdgIndex !== undefined) {
    backgroundColor = sdg[sdgIndex].colorInfo.hex;
    targetImage = sdg[sdgIndex].icon_url;
  }

  if (bannerBackgroundColor !== undefined) {
    backgroundColor = bannerBackgroundColor;
  }

  return (
    <div
      style={{
        height: "5em",
        display: "flex",
        flexDirection: "row",
        backgroundColor: backgroundColor,
      }}
    >
      <div
        style={{
          width: "360px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <ComboBoxYear defaultValue={year} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1
        }}
      >
        <h2 className="titleFable">{title}</h2>
      </div>
      <div style={{ width: "5em" }}>
        <img alt="" className="sdg-icon" src={targetImage} />
      </div>
    </div>
  );
};

export default BannerTitle;
