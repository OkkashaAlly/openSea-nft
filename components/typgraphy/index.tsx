import { ReactNode } from "react";

// ==================================================
// HEADINGS =========================================
// ==================================================
export const H1 = ({
  styles,
  children,
}: {
  styles?: string;
  children: ReactNode;
}) => <h1 className={`text-4xl font-bold  ${styles}`}>{children}</h1>;

export const H2 = ({
  styles,
  children,
}: {
  styles?: string;
  children: ReactNode;
}) => <h1 className={`text-2xl font-bold  ${styles}`}>{children}</h1>;

export const H3 = ({
  styles,
  children,
}: {
  styles?: string;
  children: ReactNode;
}) => <h1 className={`text-lg font-semibold  ${styles}`}>{children}</h1>;

export const H4 = ({
  styles,
  children,
}: {
  styles?: string;
  children: ReactNode;
}) => <h1 className={`text-base font-bold  ${styles}`}>{children}</h1>;

// ==================================================
// SUB HEADINGS =====================================
// ==================================================
export const SubH1 = ({
  styles,
  children,
}: {
  styles?: string;
  children: ReactNode;
}) => (
  <h1 className={`text-lg text-[#2E6D64] uppercase ${styles}`}>{children}</h1>
);

export const SubH2 = ({
  styles,
  children,
}: {
  styles?: string;
  children: ReactNode;
}) => (
  <h1 className={`text-sm font-semibold text-[#2E6D64] ${styles}`}>
    {children}
  </h1>
);

// ====================================================
// PARAGRAPHS =========================================
// ====================================================

export const P1 = ({
  styles,
  children,
}: {
  styles?: string;
  children: ReactNode;
}) => <p className={`text-xl ${styles}`}>{children}</p>;

export const P2 = ({
  styles,
  children,
}: {
  styles?: string;
  children: ReactNode;
}) => <p className={`text-lg ${styles}`}>{children}</p>;
