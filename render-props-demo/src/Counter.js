import { createContext, useContext, useState } from "react";

// ============================================
// COMPOUND COMPONENT PATTERN IMPLEMENTATION
// ============================================

// ========================================
// STEP 1: Create a Context
// ========================================
// This context will be used to share state between the parent (Counter)
// and all child components (Count, Label, Increase, Decrease)
// WITHOUT passing props explicitly!
const CounterContext = createContext();

// ========================================
// STEP 2: Create Parent Component
// ========================================
// The parent component:
// 1. Manages the state (count)
// 2. Provides state to children via Context
// 3. Renders children components
function Counter({
  children,
  // Props below are only for the "prop explosion" example
  // In real compound components, you wouldn't need these!
  iconIncrease,
  iconDecrease,
  label,
  hideLabel,
  hideIncrease,
  hideDecrease,
}) {
  // State lives in the parent component
  const [count, setCount] = useState(0);
  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);

  return (
    // Provider makes state available to ALL children via context
    // Any child using useContext(CounterContext) can access these values
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <span>
        {/* COMPOUND COMPONENT PATTERN: Render children as-is */}
        {/* Children can be arranged in ANY order by the user! */}
        {children}

        {/* PROP EXPLOSION APPROACH: For comparison */}
        {/* This requires tons of props and is inflexible */}
        {!children && (
          <>
            {!hideDecrease && <button onClick={decrease}>{iconDecrease}</button>}
            {!hideLabel && <span>{label}</span>}
            <span>{count}</span>
            {!hideIncrease && <button onClick={increase}>{iconIncrease}</button>}
          </>
        )}
      </span>
    </CounterContext.Provider>
  );
}

// ========================================
// STEP 3: Create Child Components
// ========================================
// Each child component:
// 1. Uses useContext to access parent state
// 2. Has a specific responsibility
// 3. Only makes sense when used with Counter parent

// Count Component - Displays the current count value
function Count() {
  // Access count from parent's context (no props needed!)
  const { count } = useContext(CounterContext);
  return <span>{count}</span>;
}

// Label Component - Displays custom text
function Label({ children }) {
  // This one doesn't need context, it just displays children
  return <span>{children}</span>;
}

// Increase Component - Button to increment counter
function Increase({ icon }) {
  // Access increase function from parent's context
  const { increase } = useContext(CounterContext);
  return <button onClick={increase}>{icon}</button>;
}

// Decrease Component - Button to decrement counter
function Decrease({ icon }) {
  // Access decrease function from parent's context
  const { decrease } = useContext(CounterContext);
  return <button onClick={decrease}>{icon}</button>;
}

// ========================================
// STEP 4: Attach Children to Parent
// ========================================
// This creates a namespace: Counter.Count, Counter.Label, etc.
// Benefits:
// - Shows these components are related
// - Only need to import Counter
// - IDE autocomplete support
// - Semantic and clean API
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;

// ========================================
// USAGE EXAMPLES - See App.js
// ========================================
// This Counter component can be used in many flexible ways:
//
// Example 1: Standard layout with label
//   Counter > Label > Decrease > Count > Increase
//
// Example 2: Different order
//   Counter > Count > Increase > Decrease
//
// Example 3: Omit components
//   Counter > Increase > Decrease (no Count or Label)
//
// Example 4: Custom arrangement with emojis
//   Counter > Count > Increase > Decrease > Label
//
// For live examples, see App.js in this project!
