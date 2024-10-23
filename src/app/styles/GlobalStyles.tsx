import {GlobalStyles} from "@mui/material";

const styles = {
     'html, body' : {
         height: '100%',
         width: '100%',
     },
     '#root': {
         height: '100%',
         width: '100%',
         backgroundColor: 'primary.main',
     },
 }

 export default () => <GlobalStyles styles={styles}/>