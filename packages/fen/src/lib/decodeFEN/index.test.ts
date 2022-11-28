import { ShahmatBoardState } from "@shahmat/utils";
import { decodeFEN } from ".";

describe("decodeFEN", () => {
  it("throws when argument is not a string", () => {
    expect(() => decodeFEN([] as unknown as string)).toThrow();
  });

  it("throws when string is not a FEN string", () => {
    expect(() => decodeFEN("dummy string")).toThrow();
  });

  it("throws when string has incorrect number of parts", () => {
    expect(() =>
      decodeFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq")
    ).toThrow();
  });

  it("throws when string has incorrect number of board rows", () => {
    expect(() =>
      decodeFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP w KQkq - 0 1")
    ).toThrow();
  });

  it("throws when row contains an invalid piece", () => {
    expect(() =>
      decodeFEN("rXbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    ).toThrow();
  });

  it("throws when row contains an invalid column skip number", () => {
    expect(() =>
      decodeFEN("rnbqkbnr/pppppppp/9/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    ).toThrow();
  });

  it("throws when row contains an incorrect sum of columns and skip numbers", () => {
    expect(() =>
      decodeFEN(
        "rnbq4rk1/ppp1ppbp/5np1/3p4/3P1B2/4PN1P/PPP2PP1/RN1QKB1R w KQ - 1 6"
      )
    ).toThrow();

    expect(() =>
      decodeFEN(
        "rnbq1rk2/ppp1ppbp/5np1/3p4/3P1B2/4PN1P/PPP2PP1/RN1QKB1R w KQ - 1 6"
      )
    ).toThrow();
  });

  const validExamples: Array<[string, ShahmatBoardState]> = [
    [
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      {
        pieces: {
          a1: "R",
          b1: "N",
          c1: "B",
          d1: "Q",
          e1: "K",
          f1: "B",
          g1: "N",
          h1: "R",
          a2: "P",
          b2: "P",
          c2: "P",
          d2: "P",
          e2: "P",
          f2: "P",
          g2: "P",
          h2: "P",
          a7: "p",
          b7: "p",
          c7: "p",
          d7: "p",
          e7: "p",
          f7: "p",
          g7: "p",
          h7: "p",
          a8: "r",
          b8: "n",
          c8: "b",
          d8: "q",
          e8: "k",
          f8: "b",
          g8: "n",
          h8: "r",
        },
        activeColor: "white",
        castlingRights: {
          white: {
            queenside: true,
            kingside: true,
          },
          black: {
            queenside: true,
            kingside: true,
          },
        },
        enPassantTarget: null,
        halfmoveClock: 0,
        moveNumber: 1,
      },
    ],
  ];

  it.each(validExamples)(
    "returns correct board state for valid fen",
    (string, result) => {
      expect(decodeFEN(string)).toEqual(result);
    }
  );
});
