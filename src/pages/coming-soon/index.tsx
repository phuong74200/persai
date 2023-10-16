import { Dna } from "react-loader-spinner";
import { Button, Modal, Stack, Text, Title } from "@mantine/core";

import useModalRouteTrasition from "@/hooks/use-modal-route-transition";

export default function ComingSoonPage() {
  const { open, goBack } = useModalRouteTrasition();

  return (
    <Modal
      opened={open}
      onClose={goBack}
      transitionProps={{
        transition: "slide-up",
      }}
      withCloseButton={false}
      size={700}
      centered
    >
      <Stack justify="center" align="center">
        <Title size="3rem" align="center" className="leading-none" order={3} mt="1rem">
          COMING SOON
        </Title>
        <Dna visible={true} height="80" width="80" ariaLabel="dna-loading" />
        <Text align="center" size="lg">
          We will notify you when this feature is ready
        </Text>
        <Button color="green" size="lg" my="1rem" onClick={goBack}>
          GO BACK
        </Button>
      </Stack>
    </Modal>
  );
}
