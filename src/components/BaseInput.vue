<template>
  <label class="input-label">
    <!-- input must have placeholder=" " -->
    <input
      :type="inputType"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder=" "
    />
    <span><slot>SomeField</slot></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    type: { type: String, default: "text" },
    modelValue: { type: String },
  },
  emits: ["update:modelValue"],
  computed: {
    inputType: function () {
      return this.type ?? "text";
    },
  },
});
</script>

<style scoped>
.input-label {
  --input-safari-helper1: rgb(var(--input-primary-rgb, 126, 126, 126));
  position: relative;
  display: inline-block;
  padding-top: 6px;
  font-family: var(
    --input-font,
    "Roboto",
    "Segoe UI",
    BlinkMacSystemFont,
    system-ui,
    -apple-system
  );
  font-size: 14px;
  line-height: 1.5;
  overflow: hidden;
}

/* Input, Textarea */
.input-label > input,
.input-label > textarea {
  box-sizing: border-box;
  margin: 0;
  border: solid 1px; /* Safari */
  border-color: rgba(var(--input-onsurface-rgb, 0, 0, 0), 0.6);
  border-top-color: transparent;
  border-radius: 4px;
  padding: 15px 13px 15px;
  width: 100%;
  height: inherit;
  color: rgba(var(--input-onsurface-rgb, 0, 0, 0), 0.87);
  background-color: transparent;
  box-shadow: none; /* Firefox */
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  caret-color: rgb(var(--input-primary-rgb, 126, 126, 126));
  transition: border 0.2s, box-shadow 0.2s;
}

/* Span */
.input-label > input + span,
.input-label > textarea + span {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  border-color: rgba(var(--input-onsurface-rgb, 0, 0, 0), 0.6);
  width: 100%;
  max-height: 100%;
  color: rgba(var(--input-onsurface-rgb, 0, 0, 0), 0.6);
  font-size: 75%;
  line-height: 15px;
  cursor: text;
  transition: color 0.2s, font-size 0.2s, line-height 0.2s;
}

/* Corners */
.input-label > input + span::before,
.input-label > input + span::after,
.input-label > textarea + span::before,
.input-label > textarea + span::after {
  content: "";
  display: block;
  box-sizing: border-box;
  margin-top: 6px;
  border-top: solid 1px;
  border-top-color: rgba(var(--input-onsurface-rgb, 0, 0, 0), 0.6);
  min-width: 10px;
  height: 8px;
  pointer-events: none;
  box-shadow: inset 0 1px transparent;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-label > input + span::before,
.input-label > textarea + span::before {
  margin-right: 4px;
  border-left: solid 1px transparent;
  border-radius: 4px 0;
}

.input-label > input + span::after,
.input-label > textarea + span::after {
  flex-grow: 1;
  margin-left: 4px;
  border-right: solid 1px transparent;
  border-radius: 0 4px;
}

/* Hover */
.input-label:hover > input,
.input-label:hover > textarea {
  border-color: rgba(var(--input-onsurface-rgb, 0, 0, 0), 0.87);
  border-top-color: transparent;
}

.input-label:hover > input + span::before,
.input-label:hover > textarea + span::before,
.input-label:hover > input + span::after,
.input-label:hover > textarea + span::after {
  border-top-color: rgba(var(--input-onsurface-rgb, 0, 0, 0), 0.87);
}

.input-label:hover > input:not(:focus):placeholder-shown,
.input-label:hover > textarea:not(:focus):placeholder-shown {
  border-color: rgba(var(--input-onsurface-rgb, 0, 0, 0), 0.87);
}

/* Placeholder-shown */
.input-label > input:not(:focus):placeholder-shown,
.input-label > textarea:not(:focus):placeholder-shown {
  border-top-color: rgba(var(--input-onsurface-rgb, 0, 0, 0), 0.6);
}

.input-label > input:not(:focus):placeholder-shown + span,
.input-label > textarea:not(:focus):placeholder-shown + span {
  font-size: inherit;
  line-height: 68px;
}

.input-label > input:not(:focus):placeholder-shown + span::before,
.input-label > textarea:not(:focus):placeholder-shown + span::before,
.input-label > input:not(:focus):placeholder-shown + span::after,
.input-label > textarea:not(:focus):placeholder-shown + span::after {
  border-top-color: transparent;
}

/* Focus */
.input-label > input:focus,
.input-label > textarea:focus {
  border-color: rgb(var(--input-primary-rgb, 126, 126, 126));
  border-top-color: transparent;
  box-shadow: inset 1px 0 var(--input-safari-helper1),
    inset -1px 0 var(--input-safari-helper1),
    inset 0 -1px var(--input-safari-helper1);
  outline: none;
}

.input-label > input:focus + span,
.input-label > textarea:focus + span {
  color: rgb(var(--input-primary-rgb, 126, 126, 126));
}

.input-label > input:focus + span::before,
.input-label > input:focus + span::after,
.input-label > textarea:focus + span::before,
.input-label > textarea:focus + span::after {
  border-top-color: var(--input-safari-helper1) !important;
  box-shadow: inset 0 1px var(--input-safari-helper1);
}

/* Disabled */
.input-label > input:disabled,
.input-label > input:disabled + span,
.input-label > textarea:disabled,
.input-label > textarea:disabled + span {
  border-color: rgba(var(--input-onsurface-rgb, 0, 0, 0), 0.38) !important;
  border-top-color: transparent !important;
  color: rgba(var(--input-onsurface-rgb, 0, 0, 0), 0.38);
  pointer-events: none;
}

.input-label > input:disabled + span::before,
.input-label > input:disabled + span::after,
.input-label > textarea:disabled + span::before,
.input-label > textarea:disabled + span::after {
  border-top-color: rgba(var(--input-onsurface-rgb, 0, 0, 0), 0.38) !important;
}

.input-label > input:disabled:placeholder-shown,
.input-label > input:disabled:placeholder-shown + span,
.input-label > textarea:disabled:placeholder-shown,
.input-label > textarea:disabled:placeholder-shown + span {
  border-top-color: rgba(var(--input-onsurface-rgb, 0, 0, 0), 0.38) !important;
}

.input-label > input:disabled:placeholder-shown + span::before,
.input-label > input:disabled:placeholder-shown + span::after,
.input-label > textarea:disabled:placeholder-shown + span::before,
.input-label > textarea:disabled:placeholder-shown + span::after {
  border-top-color: transparent !important;
}

/* Faster transition in Safari for less noticable fractional font-size issue */
@media not all and (min-resolution: 0.001dpcm) {
  @supports (-webkit-appearance: none) {
    .input-label > input,
    .input-label > input + span,
    .input-label > textarea,
    .input-label > textarea + span,
    .input-label > input + span::before,
    .input-label > input + span::after,
    .input-label > textarea + span::before,
    .input-label > textarea + span::after {
      transition-duration: 0.1s;
    }
  }
}
</style>
