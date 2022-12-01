/* eslint-disable no-bitwise */
const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const endCode = (input) => {
  let str = input;
  let output = '';

  for (
    let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || ((map = '='), i % 1);
    output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
  ) {
    charCode = str.charCodeAt((i += 3 / 4));

    if (charCode > 0xff) {
      throw new Error(
        "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.",
      );
    }

    block = (block << 8) | charCode;
  }
  return output;
};
const deCode = (input) => {
  let str = input.replace(/[=]+$/, '');
  let output = '';

  if (str.length % 4 === 1) {
    throw new Error(
      "'atob' failed: The string to be decoded is not correctly encoded.",
    );
  }
  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }
  return output;
};
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTNlZjRmN2I1YzRiZWY2N2U5OGU1ZTJjMDNlZjIxZjEwM2Q5YjRiNjgyYzA4ZTU1NGEzNTU3ZGJmZjE5ZmMxMDM1ODQxNjdmMjU2ZjI3YjkiLCJpYXQiOjE2MjUxNDcyMjkuNTkyODE1LCJuYmYiOjE2MjUxNDcyMjkuNTkyODE4LCJleHAiOjE2NTY2ODMyMjkuNTg5NDc3LCJzdWIiOiIyOCIsInNjb3BlcyI6W119.K93cpNYIwz6lC06fUm2wfpVtuK2Ooljhrddlz6zbyzLu_YVD8qVV3EVQDRtYDG7eMSzy7T234q9vRSTfvRbjRgsDZoabmspirbZmr1SRS8qPSE_TjMcs64TM4HVbcbBpD6V67qBEr2dTSJ3nuHICak7K2Snn-tN1UkggkIfLHKigFKj9yLdj4Fx1GM69vsweODPHo1dIqrblxqF_IMsnkucVCBxLZ-LP6J7eihP6Po3OVG8jnK96SstfpL1PIvps8IAmBwyhik2I8HHwgooFgnR8tOI1suTOm5yUgYijWGABeKbUqOswY4v7omv6xDwZBwWOMo4D4U_xKdiR2QPGYyBppEiz9T916ghjo9DYvbYd1PCeN_bIrsAFaQIq9i5otncpdVUBpNg49Wkz8DiI-88zn3Rn38EclD_1PgJxeVjbqQUss2vKnfBcoxP7ul8EQyAy-N5VYTfzwV1ha19KRgLSm3djBBKQE1-SHnp8WXZ_QjN_XIyZV9Wrk0OjG98-bNYaJ6aFFxLMT468AqvVSSYs5noFKn4p4vCostiJxGNV_yEyQx2BDmN1FI0Rv0Ks1YW9XNwgCQmt2T28LUYi1wKn15DExasipRo0_UCtP3P9IwmsA7cnfkigvWCIhTpXjKBk8qCsbQhJo_yJvDU_F1Wsop9rZCL-0ApszWomAJE';
console.log(endCode(token));
console.log('------------');
console.log(
  deCode(
    'ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKU1V6STFOaUo5LmV5SmhkV1FpT2lJeElpd2lhblJwSWpvaVpUTmxaalJtTjJJMVl6UmlaV1kyTjJVNU9HVTFaVEpqTURObFpqSXhaakV3TTJRNVlqUmlOamd5WXpBNFpUVTFOR0V6TlRVM1pHSm1aakU1Wm1NeE1ETTFPRFF4TmpkbU1qVTJaakkzWWpraUxDSnBZWFFpT2pFMk1qVXhORGN5TWprdU5Ua3lPREUxTENKdVltWWlPakUyTWpVeE5EY3lNamt1TlRreU9ERTRMQ0psZUhBaU9qRTJOVFkyT0RNeU1qa3VOVGc1TkRjM0xDSnpkV0lpT2lJeU9DSXNJbk5qYjNCbGN5STZXMTE5Lks5M2NwTllJd3o2bEMwNmZVbTJ3ZnBWdHVLMk9vbGpocmRkbHo2emJ5ekx1X1lWRDhxVlYzRVZRRFJ0WURHN2VNU3p5N1QyMzRxOXZSU1RmdlJialJnc0Rab2FibXNwaXJiWm1yMVNSUzhxUFNFX1RqTWNzNjRUTTRIVmJjYkJwRDZWNjdxQkVyMmRUU0ozbnVISUNhazdLMlNubi10TjFVa2dna0lmTEhLaWdGS2o5eUxkajRGeDFHTTY5dnN3ZU9EUEhvMWRJcXJibHhxRl9JTXNua3VjVkNCeExaLUxQNko3ZWloUDZQbzNPVkc4am5LOTZTc3RmcEwxUEl2cHM4SUFtQnd5aGlrMkk4SEh3Z29vRmduUjh0T0kxc3VUT201eVVnWWlqV0dBQmVLYlVxT3N3WTR2N29tdjZ4RHdaQndXT01vNEQ0VV94S2RpUjJRUEdZeUJwcEVpejlUOTE2Z2hqbzlEWXZiWWQxUENlTl9iSXJzQUZhUUlxOWk1b3RuY3BkVlVCcE5nNDlXa3o4RGlJLTg4em4zUm4zOEVjbERfMVBnSnhlVmpicVFVc3MydktuZkJjb3hQN3VsOEVReUF5LU41VllUZnp3VjFoYTE5S1JnTFNtM2RqQkJLUUUxLVNIbnA4V1haX1FqTl9YSXlaVjlXcmswT2pHOTgtYk5ZYUo2YUZGeExNVDQ2OEFxdlZTU1lzNW5vRktuNHA0dkNvc3RpSnhHTlZfeUV5UXgyQkRtTjFGSTBSdjBLczFZVzlYTndnQ1FtdDJUMjhMVVlpMXdLbjE1REV4YXNpcFJvMF9VQ3RQM1A5SXdtc0E3Y25ma2lndldDSWhUcFhqS0JrOHFDc2JRaEpvX3lKdkRVX0YxV3NvcDlyWkNMLTBBcHN6V29tQUpF',
  ),
);
