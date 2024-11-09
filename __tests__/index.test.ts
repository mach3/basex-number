import { BaseXNumber } from "../src";

test("encode => decode", () => {
  const basex = new BaseXNumber();

  const inputs = [
    1, 12, 123, 1234, 12345, 123456, 1234567, 12345678, 123456789, 1234567890,
  ];
  const encoded = inputs.map((value) => basex.encode(value));
  const decoded = encoded.map((value) => basex.decode(value));

  expect(encoded.every((v) => /^[a-zA-Z0-9]+$/.test(v))).toBe(true);
  expect(decoded.every((v) => typeof v === "number")).toBe(true);
  expect(decoded).toEqual(inputs);
});

test("encode, decode with callback", () => {
  const basex = new BaseXNumber();

  const inputs = [
    1, 12, 123, 1234, 12345, 123456, 1234567, 12345678, 123456789, 1234567890,
  ];
  const encoded = inputs.map((value) => basex.encode(value, (v) => v));
  const decoded = encoded.map((value) => basex.decode(value, (v) => v));

  expect(encoded.every((v) => /^[a-zA-Z]+$/.test(v))).toBe(true);
  expect(decoded.every((v) => typeof v === "number")).toBe(true);
  expect(decoded).toEqual(inputs);
});

test("encode with custom map", () => {
  const basex = new BaseXNumber(Array.from("0123456789"));

  const inputs = [
    1, 12, 123, 1234, 12345, 123456, 1234567, 12345678, 123456789, 1234567890,
  ];
  const encoded = inputs.map((value) => basex.encode(value, (v) => v));
  const decoded = encoded.map((value) => basex.decode(value, (v) => v));

  expect(encoded.every((v) => /^[0-9]+$/.test(v))).toBe(true);
  expect(decoded.every((v) => typeof v === "number")).toBe(true);
  expect(decoded).toEqual(inputs);
});
