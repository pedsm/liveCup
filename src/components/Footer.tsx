import { Box, Flex, useColorMode } from "@chakra-ui/react"
import Link from "next/link"

const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex
      className="footer"
      alignItems="center"
      justifyContent={'space-between'}
      width="full"
      pl={2}
      pr={8}
      textColor="gray.600"
      fontSize="sm"
      my={2}
    >
      <Box>
        LiveCup 2022 Built by{" "}
        <Link
          target={"_blank"}
          style={{ fontWeight: "bold" }}
          href="https://twitter.com/pedsm"
        >
          @pedsm
        </Link>{" "}
        and{" "}
        <Link
          target={"_blank"}
          style={{ fontWeight: "bold" }}
          href="https://twitter.com/lwndothman"
        >
          @lwndothman
        </Link>{" "}
        with 🫕
      </Box>
      <Flex alignItems="center" gap={4} justifyContent="center">
        <Link target={"_blank"} href="https://github.com/pedsm/liveCup">
          <i className="fab fa-github fa-lg" />
        </Link>
        <Link target={"_blank"} href="https://ko-fi.com/pedsm">
          <i className="fa-solid fa-mug-hot fa-lg"></i>
        </Link>
        {colorMode === "dark" ? (
          <i
            onClick={() => toggleColorMode()}
            className="fa-solid fa-sun fa-lg"
            style={{
              cursor: "pointer",
            }}
          />
        ) : (
          <i
            onClick={() => toggleColorMode()}
            className="fa-solid fa-moon fa-lg"
            style={{
              cursor: "pointer",
            }}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default Footer
