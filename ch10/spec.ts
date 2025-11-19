import { z } from "zod";

// 기본형
const Id = z.string();
const DateStr = z.string();
const Amount = z.number().positive();
const Name = z.string();
const Address = z.string();
const Routing = z.string();
const Account = z.string();

// 일정
const Schedule = z.enum(["monthly", "weekly", "biweekly"]);

// 급여 방식
const SalariedPayClass = z.tuple([z.literal("salaried"), z.number().positive()]);
const HourlyPayClass = z.tuple([z.literal("hourly"), z.number().positive()]);
const CommissionedPayClass = z.tuple([
  z.literal("commissioned"),
  z.number().positive(),
  z.number().positive(),
]);

const PayClass = z.union([
  SalariedPayClass,
  HourlyPayClass,
  CommissionedPayClass,
]);

// 지급 방식
const MailDisposition = z.tuple([
  z.literal("mail"),
  z.string(),
  z.string(),
]);
const DepositDisposition = z.tuple([
  z.literal("deposit"),
  z.string(),
  z.string(),
]);
const PaymasterDisposition = z.tuple([
  z.literal("paymaster"),
  z.string(),
]);

const Disposition = z.union([
  MailDisposition,
  DepositDisposition,
  PaymasterDisposition,
]);

// 직원
const Employee = z.object({
  id: Id,
  schedule: Schedule,
  "pay-class": PayClass,
  disposition: Disposition,
});

const Employees = z.array(Employee);

// 타임 카드
const TimeCard = z.tuple([DateStr, z.number().positive()]);
const TimeCards = z.record(Id, z.array(TimeCard));

// 판매내역 
const SalesReceipt = z.tuple([DateStr, z.number().positive()]);
const SalesReceipts = z.record(Id, z.array(SalesReceipt));

// DB
const DB = z.object({
  employees: Employees,
  "time-cards": TimeCards.optional(),
  "sales-receipts": SalesReceipts.optional(),
});

// 입금 지급
const MailDirective = z.object({
  type: z.literal("mail"),
  id: Id,
  name: Name,
  address: Address,
  amount: Amount,
});

const DepositDirective = z.object({
  type: z.literal("deposit"),
  id: Id,
  routing: Routing,
  account: Account,
  amount: Amount,
});

const PaymasterDirective = z.object({
  type: z.literal("paymaster"),
  id: Id,
  amount: Amount,
});

const PaycheckDirective = z.union([
  MailDirective,
  DepositDirective,
  PaymasterDirective,
]);

const PaycheckDirectives = z.array(PaycheckDirective);


const exampleEmployee = {
  id: "emp1",
  schedule: "monthly",
  "pay-class": ["salaried", 5000],
  disposition: ["mail", "name", "home"],
};

console.log(Employee.safeParse(exampleEmployee));


const paySalary = z
  .function()
  .args(z.number().positive())
  .returns(z.number().positive())
  .implement((amount) => amount * 0.9);

paySalary(1000); // ok
paySalary(-5);   // 여기에서는 오류가 발생한다.
