import Counter from "./Counter";
import "./styles.css";

export default function App() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>

      {/* ================================================= */}
      {/* ❌ THE PROBLEM: Prop Explosion */}
      {/* ================================================= */}
      <div>
        <h3>❌ Prop Explosion Approach (NOT flexible)</h3>
        {/* 
          Problems with this approach:
          1. Too many props needed to configure
          2. Can't change the order of elements
          3. Limited customization options
          4. Need to add new props for every feature
          5. Hard to read and maintain
        */}
        <Counter
          iconIncrease="+"
          iconDecrease="-"
          label="My NOT so flexible counter"
          hideLabel={false}
          hideIncrease={false}
          hideDecrease={false}
          // Imagine needing even MORE props like:
          // positionCount="middle"
          // positionLabel="left"
          // buttonSize="large"
          // ...and so on!
        />
      </div>

      {/* ================================================= */}
      {/* ✅ THE SOLUTION: Compound Components */}
      {/* ================================================= */}
      <div>
        <h3>✅ Compound Component Pattern (Super Flexible)</h3>

        {/* Example 1: Standard layout with label first */}
        <div>
          {/*
            Benefits shown here:
            - Clear, readable structure
            - No props explosion
            - Can see exactly what's rendered
          */}
          <Counter>
            <Counter.Label>My super flexible counter</Counter.Label>
            <Counter.Decrease icon={"−"} />
            <Counter.Count />
            <Counter.Increase icon={"+"} />
          </Counter>
        </div>

        {/* Example 2: Different order - Count in the middle */}
        <div>
          {/*
            Flexibility Demo #1:
            - Same components, different order!
            - No new props needed
            - Just rearrange the JSX
          */}
          <Counter>
            <Counter.Increase icon={"🔼"} />
            <Counter.Count />
            <Counter.Decrease icon={"🔽"} />
          </Counter>
        </div>

        {/* Example 3: Count first, label last */}
        <div>
          {/*
            Flexibility Demo #2:
            - Another different arrangement
            - Using emoji icons
            - Label at the end
            Try doing this with props alone! 🤔
          */}
          <Counter>
            <Counter.Count />
            <Counter.Increase icon={"⬆️"} />
            <Counter.Decrease icon={"⬇️"} />
            <Counter.Label>Counter with emojis</Counter.Label>
          </Counter>
        </div>

        {/* Example 4: No count display! */}
        <div>
          {/*
            Flexibility Demo #3:
            - Completely omit the Count component
            - Just buttons with a label
            - No hideCount prop needed!
            - Just don't include what you don't want
          */}
          <Counter>
            <Counter.Decrease icon={"−"} />
            <Counter.Increase icon={"+"} />
            <Counter.Label>No count display!</Counter.Label>
          </Counter>
        </div>

        {/*
          💡 TRY IT YOURSELF:
          Create your own layout! Mix and match:
          - Change the order
          - Remove components
          - Add custom HTML/styling
          - Use different icons
          
          Example ideas:
          <Counter>
            <div className="my-custom-wrapper">
              <Counter.Label>Custom: </Counter.Label>
              <Counter.Count />
            </div>
            <Counter.Increase icon="🚀" />
          </Counter>
        */}
      </div>
    </div>
  );
}

/*
  ========================================
  KEY TAKEAWAYS:
  ========================================
  
  1. FLEXIBILITY
     - Rearrange components freely
     - No configuration props needed
     
  2. CLEAN API
     - Self-documenting code
     - Easy to read and understand
     
  3. ENCAPSULATION
     - State hidden inside Counter
     - Children access via Context
     
  4. REUSABILITY
     - Same components
     - Infinite variations
     
  5. COMPOSABILITY
     - Mix with your own HTML
     - Nest and combine freely
*/

