describe("Swag Labs Test Suite", () => {
  it("Should display an error message for invalid login credentialsn", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.title().should("contain", "Swag Labs");
    cy.get("#user-name").type("invalid");
    cy.get("#password").type("invalid");
    cy.get("#login-button").click();
    cy.get("h3[data-test=error]").should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  beforeEach("Login", () => {
    cy.fixture("testData").then((data) => {
      cy.login(data.username, data.password);
    });
  });
  
  it("Should add an item to the cart and complete the checkout process", () => {
    cy.get("button[data-test=add-to-cart-sauce-labs-backpack]").click();
    cy.get(".shopping_cart_link").click();
    cy.get(".inventory_item_name").should("have.text", "Sauce Labs Backpack");
    cy.get("button[data-test=checkout]").click();
    cy.get("input[name=firstName]").type("Daniyal");
    cy.get("input[name=lastName]").type("Farman");
    cy.get("input[name=postalCode]").type("26000");
    cy.get("input[name=continue]").click();
    cy.get("button[name=finish]").click();
    cy.get(".complete-header").should("have.text", "Thank you for your order!");
    cy.get("#back-to-products").click();
  });

  
  it("Add to cart from an item view", () => {
    cy.get("a[id='item_4_title_link'] div[class='inventory_item_name ']")
      .should("have.text", "Sauce Labs Backpack")
      .click();
    cy.get("button[data-test=add-to-cart]").click();
    cy.get(".shopping_cart_link").click();
    cy.get(".inventory_item_name").should("have.text", "Sauce Labs Backpack");
    cy.get("button[data-test=checkout]").click();
    cy.get("input[name=firstName]").type("Daniyal");
    cy.get("input[name=lastName]").type("Farman");
    cy.get("input[name=postalCode]").type("26000");
    cy.get("input[name=continue]").click();
    cy.get("button[name=finish]").click();
    cy.get(".complete-header").should("have.text", "Thank you for your order!");
    cy.get("#back-to-products").click();
  });
  it("check sorting", () => {
    cy.get('[data-test="inventory-item-name"]').should("have.length", 6);
    cy.get('[data-test="product-sort-container"]').select("Name (Z to A)");
    cy.get('[data-test="product-sort-container"]').should("have.value", "za");
  });

  it("Should sort in the Z-A order", () => {
    let initialNames = [];
    cy.get('[data-test="inventory-item-name"]')
      .each(($el) => {
        initialNames.push($el.text().trim());
      })
      .then(() => {
        cy.get('[data-test="product-sort-container"]').select("Name (Z to A)");
        let sortedNamesZA = [];
        cy.get('[data-test="inventory-item-name"]')
          .each(($el) => {
            sortedNamesZA.push($el.text().trim());
          })
          .then(() => {
            const sortedNamesZAExpected = [...initialNames].sort((a, b) =>
              b.localeCompare(a)
            );
            expect(sortedNamesZA).to.deep.equal(sortedNamesZAExpected);
          });
      });
  });

  it("Should sort in the A-Z order", () => {
    let initialNames = [];
    cy.get('[data-test="inventory-item-name"]')
      .each(($el) => {
        initialNames.push($el.text().trim());
      })
      .then(() => {
        cy.get('[data-test="product-sort-container"]').select("Name (A to Z)");
        let sortedNamesAZ = [];
        cy.get('[data-test="inventory-item-name"]')
          .each(($el) => {
            sortedNamesAZ.push($el.text().trim());
          })
          .then(() => {
            const sortedNamesZAExpected = [...initialNames].sort((a, b) =>
              a.localeCompare(b)
            );
            expect(sortedNamesAZ).to.deep.equal(sortedNamesZAExpected);
          });
      });
  });

  it("Should sort the list in high-to-low order", () => {
    cy.get('[data-test="product-sort-container"]').select(
      "Price (high to low)"
    );
    let sortedPricesHighToLow = [];
    cy.get('[data-test="inventory-item-price"]')
      .each(($el) => {
        const priceText = $el.text().trim();
        const priceValue = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
        sortedPricesHighToLow.push(priceValue);
      })
      .then(() => {
        const expectedPricesHighToLow = [...sortedPricesHighToLow].sort(
          (a, b) => b - a
        );
        expect(sortedPricesHighToLow).to.deep.equal(expectedPricesHighToLow);
      });
  });

  it("Should sort the list in low-to-high order", () => {
    cy.get('[data-test="product-sort-container"]').select(
      "Price (low to high)"
    );
    let sortedPricesLowToHigh = [];
    cy.get('[data-test="inventory-item-price"]')
      .each(($el) => {
        const priceText = $el.text().trim();
        const priceValue = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
        sortedPricesLowToHigh.push(priceValue);
      })
      .then(() => {
        const expectedPricesHighToLow = [...sortedPricesLowToHigh].sort(
          (a, b) => a - b
        );
        expect(sortedPricesLowToHigh).to.deep.equal(expectedPricesHighToLow);
      });
  });

  it("check items length", () => {
    cy.get('[data-test="inventory-item-name"]').should("have.length", 6);
  });
});
