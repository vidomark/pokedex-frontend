import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  paper: {
    width: "100px",
    height: "100px",
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: theme.palette.success.light,
  },
}));

export const dropdownItemStyle = {
  color: "#ddd",
  fontSize: "19px",
  marginRight: "10%",
  marginBottom: "10%",
  borderRadius: "10px",
};
