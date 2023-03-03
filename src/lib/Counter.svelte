<script>
  import OBR from "@owlbear-rodeo/sdk";

  let count = 0;
  const increment = () => {
    count += 1;
    OBR.notification.show(`count is ${count}`);
  };
</script>

<button on:click={increment}>
  count is {count}
</button>
