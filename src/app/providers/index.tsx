import compose from 'compose-function'

import {withTheme} from "app/providers/withTheme";
import {withRouter} from "app/providers/withRouter";

export const withProviders = compose(withTheme, withRouter)