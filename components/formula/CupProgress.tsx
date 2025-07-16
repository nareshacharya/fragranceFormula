'use client';

interface CupProgressProps {
  totalIngredients: number;
  totalConcentration: number;
  totalQuantity: number;
  totalCost: number;
  maxConcentration?: number;
}

export default function CupProgress({
  totalIngredients,
  totalConcentration,
  totalQuantity,
  totalCost,
  maxConcentration = 100
}: CupProgressProps) {
  const fillPercentage = Math.min((totalConcentration / maxConcentration) * 100, 100);
  const isOverfilled = totalConcentration > maxConcentration;
  const bottleColor = isOverfilled ? '#EF4444' : '#8B5CF6';

  return (
    <div className="flex items-center justify-between gap-8 px-4 py-3 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl">
      <div className="relative flex-shrink-0">
        <div className="w-24 h-28 relative">
          <svg
            width="96"
            height="112"
            viewBox="0 0 96 112"
            className="absolute inset-0"
          >
            <rect
              x="38"
              y="12"
              width="20"
              height="12"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="1.5"
              rx="1"
            />
            <rect
              x="36"
              y="8"
              width="24"
              height="6"
              fill="#D1D5DB"
              rx="2"
            />
            <path
              d="M18 24 L18 90 Q18 98 26 98 L70 98 Q78 98 78 90 L78 24 Z"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2"
            />
            <path
              d="M38 24 Q18 24 18 24 L78 24 Q58 24 58 24"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2"
            />

            <defs>
              <clipPath id="bottleClip">
                <path d="M20 26 L20 88 Q20 96 26 96 L70 96 Q76 96 76 88 L76 26 Z" />
              </clipPath>
              <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={bottleColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={bottleColor} stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {fillPercentage > 0 && (
              <rect
                x="20"
                y={26 + (70 * (100 - fillPercentage)) / 100}
                width="56"
                height={(70 * fillPercentage) / 100}
                fill="url(#liquidGradient)"
                clipPath="url(#bottleClip)"
              >
                <animate
                  attributeName="opacity"
                  values="0.6;0.8;0.6"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </rect>
            )}

            {fillPercentage > 0 && (
              <ellipse
                cx="48"
                cy={26 + (70 * (100 - fillPercentage)) / 100}
                rx="28"
                ry="3"
                fill={bottleColor}
                opacity="0.8"
                clipPath="url(#bottleClip)"
              >
                <animate
                  attributeName="ry"
                  values="3;4;3"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </ellipse>
            )}

            <text
              x="48"
              y={fillPercentage > 0 ? 26 + (70 * (100 - fillPercentage)) / 100 + (70 * fillPercentage) / 200 : 60}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={fillPercentage > 0 ? "white" : "#9CA3AF"}
              fontSize="14"
              fontWeight="bold"
              style={{ textShadow: fillPercentage > 0 ? '0 1px 2px rgba(0,0,0,0.3)' : 'none' }}
            >
              {totalConcentration.toFixed(1)}%
            </text>

            {fillPercentage > 20 && (
              <>
                <circle cx="38" cy="50" r="1" fill="#FBBF24" opacity="0.8">
                  <animate
                    attributeName="opacity"
                    values="0.8;0.2;0.8"
                    dur="1.5s"
                    repeatCount="indefinite"
                    begin="0s"
                  />
                </circle>
                <circle cx="58" cy="60" r="1" fill="#FBBF24" opacity="0.6">
                  <animate
                    attributeName="opacity"
                    values="0.6;0.1;0.6"
                    dur="1.8s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </circle>
                <circle cx="42" cy="75" r="1" fill="#FBBF24" opacity="0.7">
                  <animate
                    attributeName="opacity"
                    values="0.7;0.2;0.7"
                    dur="2.2s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </circle>
                <circle cx="64" cy="45" r="1" fill="#FBBF24" opacity="0.5">
                  <animate
                    attributeName="opacity"
                    values="0.5;0.1;0.5"
                    dur="2.8s"
                    repeatCount="indefinite"
                    begin="1.5s"
                  />
                </circle>
              </>
            )}

            {isOverfilled && (
              <g>
                <circle cx="48" cy="10" r="8" fill="#EF4444" opacity="0.9">
                  <animate
                    attributeName="opacity"
                    values="0.9;0.4;0.9"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text x="48" y="10" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10" fontWeight="bold">
                  !
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-4 gap-4">
        <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3 shadow-sm">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="ri-flask-line text-blue-600 text-sm"></i>
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">{totalIngredients}</div>
            <div className="text-sm text-gray-500">Ingredients</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3 shadow-sm">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="ri-scales-3-line text-amber-600 text-sm"></i>
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">{totalQuantity.toFixed(1)}</div>
            <div className="text-sm text-gray-500">ml Volume</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3 shadow-sm">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="ri-money-dollar-circle-line text-green-600 text-sm"></i>
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">${totalCost.toFixed(0)}</div>
            <div className="text-sm text-gray-500">Total Cost</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3 shadow-sm">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="ri-percent-line text-purple-600 text-sm"></i>
          </div>
          <div>
            <div className={`font-bold text-lg ${isOverfilled ? 'text-red-600' : 'text-gray-900'}`}>
              {totalConcentration.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">Concentration</div>
          </div>
        </div>
      </div>
    </div>
  );
}