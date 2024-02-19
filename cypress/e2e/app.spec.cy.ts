describe("Weather App Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("app is opening and contains message to enter valid location initially", () => {
    /*
    Initially location missing message should be shown and Get Weather Button should not exist
    */
    cy.contains("Weather App");
    const locationMissingMessage = `Enter valid location to get weather details`;
    cy.contains(locationMissingMessage);
    cy.get('[data-cy="get-weather-button"]').should("not.exist");
  });

  it("app shows result with correct input, with button press", () => {
    /*
    Enter any valid location, and validate that weather component is shown
    and error doesn't exist, after clicking on Get Weather Button
    */
    cy.get('[data-cy="weather-input"]').type("Delhi");
    cy.get('[data-cy="get-weather-button"]').click();
    cy.get('[data-cy="weather-component"]', { timeout: 15000 }).should(
      "be.visible"
    );
    cy.screenshot();
    cy.get('[data-cy="weather-component"]')
      .should("contain", "Delhi")
      .screenshot();
    cy.get('[data-cy="error-message"]').should("not.exist");
  });

  it("app shows result with correct input, with ENTER", () => {
    /*
    Enter any valid location, hit ENTER, and validate that weather component is shown
    and error doesn't exist
    */
    cy.get('[data-cy="weather-input"]').type("Mumbai");
    cy.get('[data-cy="weather-input"]').type("{enter}");
    cy.get('[data-cy="weather-component"]', { timeout: 15000 }).should(
      "be.visible"
    );
    cy.screenshot();
    cy.get('[data-cy="weather-component"]')
      .should("contain", "Mumbai")
      .screenshot();
    cy.get('[data-cy="error-message"]').should("not.exist");
  });

  it("app shows error with incorrect input, with button press", () => {
    /*
    Enter any random location, and validate that weather component doesn't exist
    and error is shown, after clicking on Get Weather Button
    */
    const randomString = Math.random().toString(36).substring(7);
    const errorMessage = `Error occured while fetching weather data, make sure correct location is entered!`;
    cy.get('[data-cy="weather-input"]').type(randomString);
    cy.get('[data-cy="get-weather-button"]').click();
    cy.get('[data-cy="weather-component"]').should("not.exist");
    cy.get('[data-cy="error-message"]').contains(errorMessage);
  });

  it("app shows error without input, with ENTER", () => {
    /*
    Without entering any location, hit ENTER, and validate that weather component doesn't exist
    and error is shown
    */
    const errorMessage = `Error occured while fetching weather data, make sure correct location is entered!`;
    const locationMissingMessage = `Enter valid location to get weather details`;
    cy.get('[data-cy="weather-input"]').type("{ENTER}");
    cy.contains(locationMissingMessage);
    cy.get('[data-cy="error-message"]').contains(errorMessage);
  });

  it("Get Weather button is shown only with input", () => {
    /*
    Since there is no input, so button should not exist initially
    */
    cy.get('[data-cy="get-weather-button"]').should("not.exist");

    /*
     Enter some input and check
    */
    const randomString = Math.random().toString(36).substring(7);
    cy.get('[data-cy="weather-input"]').type(randomString);
    cy.get('[data-cy="get-weather-button"]').should("exist");

    /*
    Now clear the input and check again, button should not exist
    */
    cy.get('[data-cy="weather-input"]').clear();
    cy.get('[data-cy="get-weather-button"]').should("not.exist");
  });
});
