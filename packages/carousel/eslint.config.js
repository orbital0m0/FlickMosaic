// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import watchaConfig from '@watcha/eslint-config';

export default [...watchaConfig, ...storybook.configs["flat/recommended"]];