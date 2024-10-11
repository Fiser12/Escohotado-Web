<script lang="ts">
	export let text: string;
	export let variant: 'primary' | 'secondary' | 'transparent'  = 'primary';
	export let noBreak: boolean = false;
  export let classname: string = "";
	export let fitContent: boolean = true;
</script>

<div
  class="px-4 py-2.5 rounded-sm justify-center items-center gap-1 flex text-center font-montserrat {classname}"
  class:bg-generic-bg-dark={variant === 'primary'}
  class:text-white={variant === 'primary'}
  class:border={variant === 'secondary'}
  class:border-generic-bg-dark={variant === 'secondary'}
  class:text-generic-bg-dark={variant === 'secondary'}
  class:whitespace-nowrap={noBreak}
  class:leading-3={!noBreak}
  class:inline-flex={fitContent}
  class:w-full={!fitContent}
  class:text-xs={variant !== 'transparent'}
  class:font-normal={variant !== 'transparent'}
  class:text-[#222222]={variant === 'transparent'}
  class:text-sm={variant === 'transparent'}
  class:font-bold={variant === 'transparent'}
  class:leading-none={variant === 'transparent'}
>
  {text}
</div>
