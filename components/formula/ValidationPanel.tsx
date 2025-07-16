'use client';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface ValidationPanelProps {
  validationResults: Record<string, ValidationResult>;
  totalConcentration: number;
  maxConcentration: number;
}

export default function ValidationPanel({ validationResults, totalConcentration, maxConcentration }: ValidationPanelProps) {
  const allErrors = Object.values(validationResults).flatMap((result) => result.errors);
  const allWarnings = Object.values(validationResults).flatMap((result) => result.warnings);
  const isOverLimit = totalConcentration > maxConcentration;

  if (allErrors.length === 0 && allWarnings.length === 0 && !isOverLimit) {
    return null;
  }

  return (
    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div className="flex items-start gap-2">
        <i className="ri-alert-line text-yellow-600 mt-0.5"></i>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">Validation Issues</h4>
          {isOverLimit && (
            <div className="text-sm text-red-600 mb-2">
              Total concentration ({totalConcentration.toFixed(1)}%) exceeds maximum allowed ({maxConcentration}%)
            </div>
          )}
          {allErrors.length > 0 && (
            <div className="mb-2">
              <div className="text-sm font-medium text-red-600 mb-1">Errors:</div>
              <ul className="text-sm text-red-600 list-disc list-inside">
                {allErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          {allWarnings.length > 0 && (
            <div>
              <div className="text-sm font-medium text-yellow-600 mb-1">Warnings:</div>
              <ul className="text-sm text-yellow-600 list-disc list-inside">
                {allWarnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}