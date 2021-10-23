import React from "react";
import styled from "styled-components";
import xlwIcon from "../assets/Icons/xlw.svg";
// import prtIcon from "../assets/Icons/prt.svg";
import csvIcon from "../assets/Icons/csv.svg";

const HeroSectionWrapper = styled.section`
  display: flex;
  padding: 0 1rem;
  min-height: 3rem;
  align-items: center;
  justify-content: flex-end;
  /* @media ${({ theme }) => theme.breakpoint.small} {
    min-height: 4rem ;
  } */
  img {
    cursor: pointer;
    width: 2%;
    margin-right: 0.5rem;
  }
  .count-box {
    display: block;
    letter-spacing: 1px;
    padding: 0.6rem 1rem;
    background-color: #fff;
    box-shadow: ${({ theme }) => theme.shadow};
    color: ${({ theme }) => theme.themeColor.primary};
    border-radius: ${({ theme }) => theme.shape.rounded};
    font: ${({ theme }) => theme.fontAppearance.subheader};
  }
  @media print{
    display: none;
  }
`;

const HeroSection = ({
  listType,
  totalLists,
  isListing,
  IconVisible,
  handlePrint,
}) => {
  return (
    <HeroSectionWrapper>
      {IconVisible && (
        <>
          <img src={xlwIcon} alt="print icon" />
          {/* <img src={prtIcon} alt="print icon" onClick={handlePrint} /> */}
          <img src={csvIcon} alt="print icon" />
        </>
      )}
      {isListing && (
        <div className="count-box">
          No. of {listType} :&nbsp;&nbsp;&nbsp;{totalLists}
        </div>
      )}
    </HeroSectionWrapper>
  );
};

export default HeroSection;
