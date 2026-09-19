import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "Nexora",
  clientId: "mini-ecommerce",
});

export default keycloak;