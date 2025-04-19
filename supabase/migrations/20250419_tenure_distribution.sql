
create or replace function get_tenure_distribution()
returns table (
  range text,
  count bigint
) language sql as $$
  with tenure_ranges as (
    select
      case
        when date_part('year', age(current_date, hire_date::date)) < 1 then 'Less than 1 year'
        when date_part('year', age(current_date, hire_date::date)) between 1 and 2 then '1-2 years'
        when date_part('year', age(current_date, hire_date::date)) between 3 and 5 then '3-5 years'
        when date_part('year', age(current_date, hire_date::date)) between 6 and 10 then '6-10 years'
        else 'Over 10 years'
      end as range
    from employees
  )
  select
    range,
    count(*) as count
  from tenure_ranges
  group by range
  order by
    case range
      when 'Less than 1 year' then 1
      when '1-2 years' then 2
      when '3-5 years' then 3
      when '6-10 years' then 4
      else 5
    end;
$$;
