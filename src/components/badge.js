import React from "react";
import styled, { css } from "styled-components";

const BadgeWrapper = styled.span`
  min-width: 5rem;
  text-align: center;
  display: inline-block;
  border-radius: 0.2rem;
  padding: 0.1rem 0.2rem;
  font: ${({ theme }) => theme.fontAppearance.default};
  border: 1px solid ${({ theme }) => theme.themeColor.active};
  background-color: ${({ badgeType }) =>
    badgeType === "Active" ? "#006D77" : "#fff"};
  color: ${({ badgeType }) => (badgeType === "Active" ? "#fff" : "#006D77")};
  ${({ tags }) =>
    tags &&
    css`
      border: none;
      border-radius: 1rem;
      color: ${({ theme }) => theme.themeColor.primary};
      font: ${({ theme }) => theme.fontAppearance.defaultBold};
      background: ${({ theme }) => theme.themeColor.secondary};
    `}
  ${({ processing, delivered, cancelled, shipped, outfordelivery }) =>
    (processing || delivered || cancelled || shipped || outfordelivery) &&
    css`
      background-color: ${processing
        ? "#E9C46A"
        : delivered
        ? "#40916C"
        : cancelled
        ? "#9E2A2B"
        : shipped
        ? "#7BB6D7"
        : outfordelivery
        ? "#2C7DA0"
        : "#fff"};
      border-color: ${processing
        ? "#E9C46A"
        : delivered
        ? "#40916C"
        : cancelled
        ? "#9E2A2B"
        : shipped
        ? "#7BB6D7"
        : outfordelivery
        ? "#2C7DA0"
        : "#fff"};
      color: #fff;
    `};

  ${({ paid, unpaid, refund }) =>
    (paid || unpaid || refund) &&
    css`
      background-color: ${
        paid ? "#52B69A" : unpaid ? "#CE4257" : refund ? "#6C757D" : "#fff"
      };
      border-color: ${
        paid ? "#52B69A" : unpaid ? "#CE4257" : refund ? "#6C757D" : "#fff"
      };
      color: #fff;
    `};
  ${({ enabled, disabled }) =>
    (enabled || disabled) &&
    css`
      background-color: ${enabled ? "#006D77" : disabled ? "#707070" : "#fff"};
      color: ${enabled ? "#fff" : disabled ? "#8F8F8F" : "#000"};
      border-color: ${enabled ? "#006D77" : disabled ? "#707070" : "#fff"};
    `}

  ${({ success, failure, pending }) =>
    (success || failure || pending) &&
    css`
      background-color: ${success
        ? "#40916C"
        : failure
        ? "#CE4257"
        : pending
        ? "#E9C46A"
        : "#fff"};
      border-color: ${success
        ? "#40916C"
        : failure
        ? "#CE4257"
        : pending
        ? "#E9C46A"
        : "#fff"};
      color: #fff;
    `}

  ${({ completed, failed, process }) =>
    (completed || failed || process) &&
    css`
      background-color: ${completed
        ? "#40916C"
        : failed
        ? "#CE4257"
        : process
        ? "#E9C46A"
        : "#fff"};
      border-color: ${completed
        ? "#40916C"
        : failed
        ? "#CE4257"
        : process
        ? "#E9C46A"
        : "#fff"};
      color: #fff;
    `}
`;

const Badge = ({
  children,
  badgeType,
  statusType,
  processing,
  delivered,
  cancelled,
  shipped,
  outfordelivery,
  paid,
  unpaid,
  refund,
  enabled,
  disabled,
  success,
  failure,
  pending,
  completed,
  failed,
  process,
  tags,
  className,
}) => {
  return (
    <BadgeWrapper
      tags={tags}
      badgeType={badgeType}
      statusType={statusType}
      className={className}
      processing={processing}
      delivered={delivered}
      cancelled={cancelled}
      shipped={shipped}
      paid={paid}
      unpaid={unpaid}
      refund={refund}
      enabled={enabled}
      disabled={disabled}
      success={success}
      failure={failure}
      pending={pending}
      completed={completed}
      failed={failed}
      process={process}
      outfordelivery={outfordelivery}
    >
      {children}
    </BadgeWrapper>
  );
};

export default Badge;
