# 校验规则

`Pulsa` > `Topup`
`Paket Data` > `DataRoaming`
`PASCA BAYAR` > `PhoneBill`
- `phone Number` 以下列数据`mapping`开头长度大于等于`8`小于等于`13`数字
  ```js
  const carriorTH = [
  {
    carrierId: 64,
    carrior: 'LIVE ON',
    mapping: ['0859103', '0859104', '0859105', '0859106'],
  },
  {
    carrierId: 6,
    carrior: 'XL Prepaid',
    mapping: [
      '0817',
      '0818',
      '0819',
      '0877',
      '0878',
      '08590',
      '08592',
      '08593',
      '08594',
      '08595',
      '08596',
      '08597',
      '08599',
    ],
  },
  {
    carrierId: 1,
    carrior: 'AXIS',
    mapping: ['0831', '0832', '0833', '0838', '08591', '08598'],
  },
  {
    carrierId: 3,
    carrior: 'Smarfren',
    mapping: ['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'],
  },
  {
    carrierId: 5,
    carrior: 'Three',
    mapping: ['0895', '0896', '0897', '0898', '0899'],
  },
  {
    carrierId: 4,
    carrior: 'Telkomsel',
    mapping: ['0811', '0812', '0813', '0821', '0822', '0823', '0851', '0852', '0853'],
  },
  {
    carrierId: 2,
    carrior: 'Indosat',
    mapping: ['0814', '0815', '0816', '0855', '0858', '0856', '0857'],
  },
  ];
  ```


  `LISTRIK PLN` > `PLN`

- `Meter No./Customer ID` 长度大于`9`小于`14`数字

`BPjS` > `BPJS`
- `Family VA Number` 长度`1-16`之间数字

`TELKOM` > `TELKOM`
- `Customer Number`->`Telkom Speedy/INDIHOME`、`Phone Number`->`Telkom Home Phone Number` 长度9-13之间数字

`PDAM`>`Padm`
- `Customer ID`->`PDAM Bill Payment`
    ```js
    /\w{4,16}/
    ```

`TV KABEL` > `CableTV`
- `Subscribe No.`

    ```js
    /\d{9,16}/
    ```

`ANGSURAN KREDIT` > `Angsuran`
- `Customer Number`-> `Loan Installment Payment` （具体需问产品）
  - 为以下产品时不限制数字其余限制类型为数字
    - `MITRA_DANA_TOP_FINANCE`
    - `SMART_FINANCE`
    - `MEGA_FINANCE`
    - `MIZUHO_BALIMOR_FINANCE`
    - `BPR_KREDIT_MANDIRI`
    - `KOPERASI_NUSA_RAYA_CIPTA`

  - 且长度大于5小于9时 需`category_id` = `20106`并且`carrier_id` = `65`
  -  或者长度大于9
