
create or replace function get_age_distribution()
returns table (
  range text,
  count bigint
) language sql as $$
  with age_ranges as (
    select
      case
        when age < 25 then 'Under 25'
        when age between 25 and 34 then '25-34'
        when age between 35 and 44 then '35-44'
        when age between 45 and 54 then '45-54'
        else '55+'
      end as range
    from employees
  )
  select
    range,
    count(*) as count
  from age_ranges
  group by range
  order by
    case range
      when 'Under 25' then 1
      when '25-34' then 2
      when '35-44' then 3
      when '45-54' then 4
      else 5
    end;
$$;
