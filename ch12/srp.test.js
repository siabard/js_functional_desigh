const { parseCustomer } = require("./srp"); // 구현한 파일을 불러옴

describe("Order Entry System", () => {
  describe("Parsing Customers", () => {
    test("parses a valid customer", () => {
      expect(
        parseCustomer([
          "Customer-id: 1234567",
          "Name: customer name",
          "Address: customer address",
          "Credit Limit: 50000",
        ])
      ).toEqual({
        id: "1234567",
        name: "customer name",
        address: "customer address",
        creditLimit: 50000,
      });
    });

    test("parses invalid customer", () => {
      expect(
        parseCustomer([
          "Customer-id: X",
          "Name: customer name",
          "Address: customer address",
          "Credit Limit: 50000",
        ])
      ).toBe("invalid");

      expect(
        parseCustomer([
          "Customer-id: 1234567",
          "Name: ",
          "Address: customer address",
          "Credit Limit: 50000",
        ])
      ).toBe("invalid");

      expect(
        parseCustomer([
          "Customer-id: 1234567",
          "Name: customer name",
          "Address: ",
          "Credit Limit: 50000",
        ])
      ).toBe("invalid");

      expect(
        parseCustomer([
          "Customer-id: 1234567",
          "Name: customer name",
          "Address: customer address",
          "Credit Limit: invalid",
        ])
      ).toBe("invalid");
    });

    test("makes sure credit limit is <= 50000", () => {
      expect(
        parseCustomer([
          "Customer-id: 1234567",
          "Name: customer name",
          "Address: customer address",
          "Credit Limit: 50001",
        ])
      ).toBe("invalid");
    });
  });
});