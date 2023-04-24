import styled from 'styled-components';

export const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.gray0};
  .flexGrid {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    .logo {
      max-width: 160px;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 20px;

      .buttons {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        gap: 15px;

        button {
          background: transparent;
          color: ${({ theme }) => theme.colors.gray150};
          transition: 0.3s;

          :hover {
            color: ${({ theme }) => theme.colors.gray300};
          }
        }
        .cartCount {
          position: absolute;
          left: 15px;
          bottom: 20px;
          width: 15px;
          height: 15px;
          border-radius: 4px;
          background-color: #27AE60;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: .75rem;
            font-weight: 700;
            color: #F5F5F5;
          }
        }
      }
    }

    @media (max-width: 600px) {
      flex-direction: column;
    }

    @media (max-width: 450px) {
      .nav {
        flex-direction: column;
      }
    }
  }
`;
