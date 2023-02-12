import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  form {
    width: 100%;
    margin-bottom: 1.5rem;
  }
`;

export const ProductList = styled.div`
  display: block;
  white-space: nowrap;
  overflow: auto;
  max-width: 100%;
  width: 100%;
  height: 400px;
  margin-bottom: 1.5rem;

  table {
    width: 100%;
    border-collapse: collapse;

    th {
      background-color: ${(props) => props.theme["gray-600"]};
      padding: 1rem;
      color: ${(props) => props.theme["gray-100"]};
      font-size: 0.875rem;
      line-height: 1.6;
      text-align: start;
      padding-inline-start: 1.5rem;
      padding-inline-end: 1.5rem;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme["gray-700"]};
      border-top: 4px solid ${(props) => props.theme["gray-100"]};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
      padding-inline-start: 1.5rem;
      padding-inline-end: 1.5rem;
      padding-top: 1rem;
      padding-bottom: 1rem;

      &:first-child {
        width: 30%;
        padding-left: 1.5rem;
      }

      &:last-child,
      &:nth-last-child(2) {
        button {
          display: flex;
          cursor: pointer;
          border: 1px solid ${(props) => props.theme["white"]};
          background: transparent;
          padding: 0.25rem;
          border-radius: 5px;
          font-size: 0.875rem;
          color: ${(props) => props.theme["white"]};

          &:hover {
            border: 1px solid ${(props) => props.theme["green-300"]};
            color: ${(props) => props.theme["green-300"]};
          }
        }
      }
    }
  }
`;

export const ContainerAvatar = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100px;
    height: 70px;
  }

  strong {
    width: max-content;
    background: ${(props) => props.theme["blue-300"]};
    border: 1px solid ${(props) => props.theme["gray-100"]};
    color: ${(props) => props.theme["gray-800"]};
    font-size: 0.75rem;
    padding: 0.25rem;
    border-radius: 5px;
    margin-top: -0.5rem;
  }
`;
