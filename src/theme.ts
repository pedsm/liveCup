import {
  extendTheme,
  StyleFunctionProps,
  type ThemeConfig,
} from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
}

// 3. extend the theme
const theme = extendTheme({
  ...config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        backgroundColor: mode("white", "black")(props),
        transition: "background-color 0s",
      },
    }),
  },
})

export default theme
