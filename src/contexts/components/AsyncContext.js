import { useEffect, useState } from "react";
import { Text, Spinner, Center, Stack, Button } from "@chakra-ui/react";

export function AsyncContext({ fetch, children }) {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(false);

  const fetchValue = () => {
    fetch()
      .then((result) => {
        setValue(result);
      })
      .catch(() => {
        setError(true);
      });
  };

  const onRetry = () => {
    setError(false);
    fetchValue();
  };

  useEffect(() => {
    if (value == null) {
      fetchValue();
    }
  }, [value]);

  return value ? (
    children(value)
  ) : (
    <LoadingPanel error={error} onRetry={onRetry} />
  );
}

function LoadingPanel({ error, onRetry }) {
  return (
    <Center height="2xl">
      <Stack direction="column" align="center">
        {(error && (
          <>
            <Text>Failed to Load Data</Text>
            <Button onClick={onRetry}>Retry</Button>
          </>
        )) || (
          <>
            <Spinner size="lg" />
            <Text>Loading Data...</Text>
          </>
        )}
      </Stack>
    </Center>
  );
}
