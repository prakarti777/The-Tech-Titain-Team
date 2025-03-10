// StartupIdeaValidator.jsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const StartupIdeaValidator = () => {
  const [ideaText, setIdeaText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea: ideaText }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching validation result:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Startup Idea Validator</h1>
      <Card>
        <CardContent className="p-4 space-y-4">
          <Textarea
            placeholder="Describe your startup idea..."
            rows={6}
            value={ideaText}
            onChange={(e) => setIdeaText(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Validating..." : "Validate Idea"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Results</h2>
            <div>
              <strong>Keywords:</strong> {result.keywords?.join(", ")}
            </div>
            <div>
              <strong>Market Data:</strong>
              <ul className="list-disc list-inside">
                {result.marketData && Object.entries(result.marketData).map(([key, val]) => (
                  <li key={key}>
                    {key}: Size {val.market_size}, Growth {val.growth_rate}, Trend {val.trend}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Competitors:</strong>
              <ul className="list-disc list-inside">
                {result.competitors && Object.entries(result.competitors).map(([key, comps]) => (
                  <li key={key}>
                    {key}:
                    {comps.map((comp, i) => (
                      <div key={i} className="ml-4">
                        {comp.name} (Strengths: {comp.strengths.join(", ")}, Weaknesses: {comp.weaknesses.join(", ")})
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Sentiment Score:</strong> {result.sentimentScore}
            </div>
            <div>
              <strong>Feasibility Score:</strong> {result.feasibilityScore} / 100
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StartupIdeaValidator;
