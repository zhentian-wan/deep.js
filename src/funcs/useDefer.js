import {onUnmounted, ref} from 'vue'

export function useDefer(maxCount = 100) {
    const frameCount = ref(0)
    let refId;
    function updateFrameCount() {
        refId = requestAnimationFrame(() => {
            frameCount.value++;
            if (frameCount.value >= maxCount) {
                return;
            }
            updateFrameCount();
        });
    }
    updateFrameCount();
    onUnmounted(() => {
        cancelAnimationFrame(refId)
    })
    return function defer(n) {
        return frameCount.value >= n;
    }
}

{/* <template>
    <div class="container">
        <div v-for="n in 100">
            <heavy-comp v-if="defer(n)"></heavy-comp>
        </div>
    </div>
</template> */}