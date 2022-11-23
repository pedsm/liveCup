import { Box, Flex, Text } from "@chakra-ui/react"
import Link from "next/link"

const Footer = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      width="full"
      px={8}
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
          <i className="fab fa-x fas fa-mug-hot fa-lg" />
        </Link>
      </Flex>
    </Flex>
  )
}

export default Footer
