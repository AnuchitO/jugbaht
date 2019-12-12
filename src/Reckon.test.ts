import { reckon, doBalances } from './Reckon'
test.skip('reckon investigate error', () => {
  //  const records = [
  // { "id": "2719722c-c263-4fa3-bcc9-d48f873758b6", "amount": 500, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
  // { "id": "08d7fa6d-9a0b-4b97-a6f1-7ec442fdcc6c", "amount": 2123, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
  // { "id": "bd66a820-b466-4c4d-a825-d67dfe0e27b5", "amount": 123123, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
  // { "id": "b8d50b42-6392-4724-942b-2dd8e575ccca", "amount": 123123, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
  // { "id": "2ac49415-9844-400b-8bf1-74acc35ff2de", "amount": 4444, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
  // { "id": "69e70e32-2630-4929-9ed0-238e595d24f9", "amount": 12312313, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
  // { "id": "8bc5d5dd-1559-4aca-a29c-4f40109cf6d9", "amount": 42342, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
  // { "id": "572f2107-e65f-4352-81d9-a39f3c7dd5b3", "amount": 12313, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
  // { "id": "94358c35-07af-42e3-9790-d8893618a29f", "amount": 23123, "payer": { "id": 1, "name": "AnuchitO" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
  // { "id": "bb865720-6030-4632-8c42-721c05eaea46", "amount": 123123, "payer": { "id": 1, "name": "AnuchitO" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
  // { "id": "8ad5af8f-c2c3-4adf-80e0-299f105141b5", "amount": 123112313, "payer": { "id": 1, "name": "AnuchitO" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
  // { "id": "e533c039-6178-49f8-8bbc-bc661f9a2c7a", "amount": 123123, "payer": { "id": 2, "name": "Kob" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" }]
  const records = [
    { "id": "2719722c-c263-4fa3-bcc9-d48f873758b6", "amount": 500, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
    { "id": "08d7fa6d-9a0b-4b97-a6f1-7ec442fdcc6c", "amount": 2123, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
    { "id": "bd66a820-b466-4c4d-a825-d67dfe0e27b5", "amount": 123123, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
    { "id": "b8d50b42-6392-4724-942b-2dd8e575ccca", "amount": 123123, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
    { "id": "2ac49415-9844-400b-8bf1-74acc35ff2de", "amount": 4444, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
    { "id": "69e70e32-2630-4929-9ed0-238e595d24f9", "amount": 12312313, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
    { "id": "8bc5d5dd-1559-4aca-a29c-4f40109cf6d9", "amount": 42342, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
    { "id": "572f2107-e65f-4352-81d9-a39f3c7dd5b3", "amount": 12313, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
    { "id": "94358c35-07af-42e3-9790-d8893618a29f", "amount": 23123, "payer": { "id": 1, "name": "AnuchitO" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
    { "id": "bb865720-6030-4632-8c42-721c05eaea46", "amount": 123123, "payer": { "id": 1, "name": "AnuchitO" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
    { "id": "8ad5af8f-c2c3-4adf-80e0-299f105141b5", "amount": 123112313, "payer": { "id": 1, "name": "AnuchitO" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" },
    { "id": "e533c039-6178-49f8-8bbc-bc661f9a2c7a", "amount": 12, "payer": { "id": 2, "name": "Kob" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" }
  ]

  const members = [
    { id: 1, name: "AnuchitO" },
    { id: 2, name: "Kob" },
    { id: 3, name: "Tom" },
    { id: 4, name: "Sao" },
    { id: 5, name: "Pan" }
  ]

  const balances = doBalances(records, members)

  expect(reckon(balances, [])).toEqual([])
})

test('reckon shoule be success', () => {
  const records = [{ "id": "17844cce-f337-4c53-855d-a30df55dc398", "amount": 50, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" }, { "id": "36151fd2-0662-4ae8-abce-1b4456ff98b7", "amount": 50, "payer": { "id": 4, "name": "Sao" }, "owes": [{ "id": 1, "name": "AnuchitO" }, { "id": 2, "name": "Kob" }, { "id": 3, "name": "Tom" }, { "id": 4, "name": "Sao" }, { "id": 5, "name": "Pan" }], "note": "Snack" }]

  const members = [
    { id: 1, name: "AnuchitO" },
    { id: 2, name: "Kob" },
    { id: 3, name: "Tom" },
    { id: 4, name: "Sao" },
    { id: 5, name: "Pan" }
  ]
  const balances = doBalances(records, members)

  const actual = reckon(balances, [])

  const expected = [
    { "debtor": { "id": 1, "name": "AnuchitO" }, "amount": 20, "creditor": { "id": 4, "name": "Sao" } },
    { "debtor": { "id": 2, "name": "Kob" }, "amount": 20, "creditor": { "id": 4, "name": "Sao" } },
    { "debtor": { "id": 3, "name": "Tom" }, "amount": 20, "creditor": { "id": 4, "name": "Sao" } },
    { "debtor": { "id": 5, "name": "Pan" }, "amount": 20, "creditor": { "id": 4, "name": "Sao" } }
  ]
  expect(actual).toEqual(expected)
})