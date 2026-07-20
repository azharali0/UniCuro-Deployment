import { describe, expect, it } from "vitest";
import { productionCandidateScore, readinessBand } from "../lib/qaProductionCandidate";

describe("production candidate score", () => {
  it("returns Production Candidate band for score >= 90", () => {
    expect(readinessBand(91)).toBe("Production Candidate");
  });

  it("averages scores", () => {
    expect(productionCandidateScore([90, 80, 100])).toBe(90);
  });
});
